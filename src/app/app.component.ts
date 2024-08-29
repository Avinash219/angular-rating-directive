import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RatingDirective } from './directives/rating.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RatingDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-rating-directive';
}
