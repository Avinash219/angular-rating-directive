import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRating]',
  standalone: true,
})
export class RatingDirective {
  @Input('appRating') ratingValue: number = 0; // Input property to hold the rating value
  private stars: HTMLElement[] = []; // Array to hold star elements
  private isRatingSet: boolean = false; // Flag to check if rating is already set

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.createStars(); // Create star elements
  }

  // Method to create star elements
  private createStars() {
    for (let i = 0; i < 5; i++) {
      const star = this.renderer.createElement('span');
      this.renderer.addClass(star, 'star');
      this.renderer.setStyle(star, 'cursor', 'pointer');
      this.renderer.setStyle(star, 'font-size', '24px');
      this.renderer.setProperty(star, 'textContent', '☆');

      this.renderer.listen(star, 'click', () => this.handleStarClick(i)); // Handle star click
      this.renderer.listen(star, 'mouseenter', () => this.hoverRating(i + 1)); // Show hover effect
      this.renderer.listen(star, 'mouseleave', () =>
        this.hoverRating(this.ratingValue)
      ); // Remove hover effect

      this.renderer.appendChild(this.el.nativeElement, star);
      this.stars.push(star);
    }
    this.updateStars(); // Initialize the stars based on the initial rating
  }

  // Method to handle star click logic
  private handleStarClick(index: number) {
    if (!this.isRatingSet) {
      // First click: Set rating up to the clicked star
      this.ratingValue = index + 1;
      this.isRatingSet = true; // Mark that the rating has been set
    } else {
      // Subsequent clicks: Toggle the clicked star
      if (this.ratingValue === index + 1) {
        this.ratingValue = 0; // If the same star is clicked, reset the rating
        this.isRatingSet = false; // Allow setting rating again
      } else {
        this.ratingValue = index + 1; // Set new rating
      }
    }
    this.updateStars();
  }

  // Method to update the star elements based on the rating value
  private updateStars() {
    for (let i = 0; i < this.stars.length; i++) {
      if (i < this.ratingValue) {
        this.renderer.setProperty(this.stars[i], 'textContent', '★'); // Filled star
      } else {
        this.renderer.setProperty(this.stars[i], 'textContent', '☆'); // Empty star
      }
    }
  }

  // Method to show hover effect on stars
  private hoverRating(rating: number) {
    for (let i = 0; i < this.stars.length; i++) {
      if (i < rating) {
        this.renderer.setProperty(this.stars[i], 'textContent', '★');
      } else {
        this.renderer.setProperty(this.stars[i], 'textContent', '☆');
      }
    }
  }
}
