export class TransitionManager {
  async time(duration) {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        resolve(); // Resolve the promise after the timeout
      }, duration);

      // Return the timer ID so it can be cleared if necessary
      return timer;
    });
  }
  
  scroll(Splide) {
    Splide.go(">"); // Move to the next slide
  }
}
