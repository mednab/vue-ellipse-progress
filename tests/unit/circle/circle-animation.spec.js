import { expect } from "chai";
import { mount } from "@vue/test-utils";
import Vue from "vue";
import Circle from "../../../src/components/Circle/Circle.vue";
import HalfCircle from "../../../src/components/Circle/HalfCircle.vue";

const factory = (propsData, container = Circle) => {
  return mount(container, {
    propsData: {
      index: 1,
      id: 2,
      multiple: false,
      progress: 50,
      ...propsData,
    },
  });
};

const animationTypeTests = (container, circleClass, prefix = "circle |") => {
  const wrapper = factory({}, container);
  const circleProgressWrapper = wrapper.find(circleClass);
  it(`${prefix} do not applies any animation type before delay`, () => {
    expect(circleProgressWrapper.classes())
      .to.be.an("array")
      .that.not.include([
        "animation__default",
        "animation__bounce",
        "animation__rs",
        "animation__reverse",
        "animation__loop",
      ]);
  });
  it(`${prefix} applies @default animation class by default`, (done) => {
    setTimeout(() => {
      expect(wrapper.vm.parsedAnimation.type).to.equal("default");
      expect(circleProgressWrapper.classes()).to.be.an("array").that.include("animation__default");
      done();
    }, 250);
  });
  it(`${prefix} applies @bounce animation class correctly`, async () => {
    wrapper.setProps({ animation: "bounce 500 500" });
    await Vue.nextTick();
    expect(circleProgressWrapper.classes()).to.include("animation__bounce");
  });
  it(`${prefix} applies @loop animation class correctly`, async () => {
    wrapper.setProps({ animation: "loop 500 500" });
    await Vue.nextTick();
    expect(circleProgressWrapper.classes()).to.include("animation__loop");
  });
  it(`${prefix} applies @reverse animation class correctly`, async () => {
    wrapper.setProps({ animation: "reverse 500 500" });
    await Vue.nextTick();
    expect(circleProgressWrapper.classes()).to.include("animation__reverse");
  });
  it(`${prefix} applies @rs animation class correctly`, async () => {
    wrapper.setProps({ animation: "rs 500 500" });
    await Vue.nextTick();
    expect(circleProgressWrapper.classes()).to.include("animation__rs");
  });
};
const animationDurationTests = (container, circleClass, prefix = "circle | ") => {
  it(`${prefix} applies default @1000 duration value as transition and animation duration`, () => {
    const circleProgressWrapper = factory({}, container).find(circleClass);

    expect(circleProgressWrapper.element.style.transitionDuration).to.equal("1000ms");
    expect(circleProgressWrapper.element.style.animationDuration).to.equal("1000ms");
  });
  it(`${prefix} applies provided duration value as transition and animation duration`, () => {
    const circleProgressWrapper = factory({ animation: "rs 500" }, container).find(circleClass);

    expect(circleProgressWrapper.element.style.transitionDuration).to.equal("500ms");
    expect(circleProgressWrapper.element.style.animationDuration).to.equal("500ms");
  });
  it(`${prefix} applies @0 duration value as transition and animation duration`, () => {
    const circleProgressWrapper = factory({ animation: "rs 0" }, container).find(circleClass);

    expect(circleProgressWrapper.element.style.transitionDuration).to.equal("0ms");
    expect(circleProgressWrapper.element.style.animationDuration).to.equal("0ms");
  });
};
const animationDelayTests = (container, circleClass, prefix = "circle | ") => {
  it(`${prefix} applies default @400 delay value as initial animation delay`, () => {
    expect(factory({}, container).vm.parsedAnimation.delay).to.equal(400);
  });
  it(`${prefix} applies @0 delay value as animation-delay`, () => {
    expect(factory({ animation: "rs 0 0" }, container).vm.parsedAnimation.delay).to.equal(0);
  });

  const progress = 60;
  const size = 200;
  const thickness = 4;

  const isHalfCircle = prefix.includes("half");

  const radius = size / 2 - thickness / 2;
  let circumference = radius * 2 * Math.PI;
  circumference = isHalfCircle ? circumference / 2 : circumference;
  const expectedOffset = circumference - (progress / 100) * circumference;

  it(`${prefix} don not applies progress before delay`, () => {
    const wrapper = factory(
      { progress, size, thickness, emptyThickness: thickness, animation: "rs 500 100" },
      container
    );
    const circleProgressWrapper = wrapper.find(circleClass);
    expect(wrapper.vm.strokeDashOffset).to.equal(circumference);
    expect(circleProgressWrapper.element.style.strokeDashoffset).to.equal(`${circumference}`);
  });
  it(`${prefix} applies the progress after delay`, (done) => {
    const wrapper = factory(
      { progress, size, thickness, emptyThickness: thickness, animation: "rs 500 100" },
      container
    );
    const circleProgressWrapper = wrapper.find(circleClass);
    setTimeout(() => {
      expect(wrapper.vm.strokeDashOffset).to.equal(expectedOffset);
      expect(circleProgressWrapper.element.style.strokeDashoffset).to.equal(`${expectedOffset}`);
      done();
    }, 150);
  });
};

export default () => {
  describe("#animation", () => {
    it("it parses the #animation property correctly", () => {
      const wrapper = factory({ animation: "rs 2000 200" });

      expect(wrapper.vm.parsedAnimation.type).to.equal("rs");
      expect(wrapper.vm.parsedAnimation.duration).to.equal(2000);
      expect(wrapper.vm.parsedAnimation.delay).to.equal(200);
    });
    describe("#animation.type", () => {
      animationTypeTests(Circle, "circle.ep-circle--progress");
      animationTypeTests(HalfCircle, "path.ep-half-circle--progress", "half circle |");
    });
    describe("#animation.duration", () => {
      animationDurationTests(Circle, "circle.ep-circle--progress");
      animationDurationTests(HalfCircle, "path.ep-half-circle--progress", "half circle |");
    });
    describe("#animation.delay", () => {
      animationDelayTests(Circle, "circle.ep-circle--progress");
      animationDelayTests(HalfCircle, "path.ep-half-circle--progress", "half circle |");
    });
  });
};
