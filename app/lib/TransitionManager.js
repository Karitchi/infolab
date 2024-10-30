import timeOut from "./time";

class TransitionManager {
  async startTimer(timerRef, slideIndex, panelsDisplayDuration) {
    timerRef.current = await timeOut(panelsDisplayDuration[slideIndex]);
  }

  resetTimer(timerRef) {
    clearTimeout(timerRef.current);
  }

  scroll(Splide) {
    Splide.go(">");
  }
}

export default TransitionManager;
