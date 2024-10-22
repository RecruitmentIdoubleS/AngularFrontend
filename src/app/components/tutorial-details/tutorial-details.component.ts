import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from '../../models/tutorial.model';
import { TutorialService } from '../../services/tutorial.service';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css'],
})
export class TutorialDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentTutorial: Tutorial = {
    id: 0, // Ensure id is initialized
    title: '',
    description: '',
    published: false,
  };

  message = '';

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTutorial(Number(this.route.snapshot.params['id'])); // Convert id to number
    }
  }

  getTutorial(id: number): void {
    this.tutorialService.get(id).subscribe({
      next: (data) => {
        if (data) {
          this.currentTutorial = data;
          console.log(data);
        } else {
          this.message = 'Tutorial not found.';
        }
      },
      error: (e) => console.error(e)
    });
  }

  updatePublished(status: boolean): void {
    const data: Tutorial = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status,
      id: this.currentTutorial.id // Include id in the data
    };

    this.message = '';

    this.tutorialService.update(this.currentTutorial.id, data).subscribe({
      next: (res) => {
        if (res) {
          this.currentTutorial.published = status;
          this.message = 'The status was updated successfully!';
        } else {
          this.message = 'Failed to update status.';
        }
      },
      error: (e) => console.error(e)
    });
  }

  updateTutorial(): void {
    this.message = '';

    this.tutorialService.update(this.currentTutorial.id, this.currentTutorial).subscribe({
      next: (res) => {
        if (res) {
          this.message = 'This tutorial was updated successfully!';
        } else {
          this.message = 'Failed to update tutorial.';
        }
      },
      error: (e) => console.error(e)
    });
  }

  deleteTutorial(): void {
    this.tutorialService.delete(this.currentTutorial.id).subscribe({
      next: (res) => {
        if (res) {
          console.log('Tutorial deleted successfully');
          this.router.navigate(['/tutorials']);
        } else {
          console.error('Failed to delete tutorial');
        }
      },
      error: (e) => console.error(e)
    });
  }
}