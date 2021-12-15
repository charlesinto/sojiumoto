import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_core/services/auth/auth.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  loading = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loading.subscribe((state) => (this.loading = state));
  }
}
