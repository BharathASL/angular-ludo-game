import { Component, VERSION } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  ArrayClassType = Array;
  board: Array<Object>;
  constructor() {
    const temp = Array(4).fill(
      AppComponent.makeCopy({ location: null, red_carpet: null })
    );
    this.board = Array(4).fill(AppComponent.makeCopy(temp));//[red, green, blue, yellow] players by index
  }

  static makeCopy<T>(target: T): T {
    return JSON.parse(JSON.stringify(target));
  }
}
