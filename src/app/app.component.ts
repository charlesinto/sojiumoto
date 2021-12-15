import { AfterViewInit, Component } from '@angular/core';

const $ = window['$'];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'sujimoto';

  ngAfterViewInit() {
    var customJS = document.createElement('script');
    customJS.type = 'text/javascript';
    customJS.src = 'assets/js/custom.js';
    const materialize = document.createElement('script');

    materialize.type = 'text/javascript';
    materialize.src = 'assets/js/materialize.min.js';

    const mixitup = document.createElement('script');

    mixitup.type = 'text/javascript';
    mixitup.src = 'assets/js/jquery.mixitup.min.js';
    // Use any selector <script src="js/custom.js"></script>
    /*

    <script src="js/materialize.min.js" type="text/javascript"></script>
	<script src="js/jquery.mixitup.min.js" type="text/javascript"></script>
    */
    $('body').append(materialize);
    $('body').append(mixitup);
    $('body').append(customJS);
  }
}
