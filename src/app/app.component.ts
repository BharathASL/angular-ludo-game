import { Component, VERSION } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  ArrayClassType = Array;
  board: Array<Array<Object>>;
  playerRoleNow: number;
  lastSep: number;
  constructor() {
    const temp = Array(4).fill(
      AppComponent.makeCopy({ location: null, red_carpet: null })
    );
    temp.map((e, i) => {
      e["indexAt"] = i;
      return e;
    });
    // this.board = Array(4).fill(AppComponent.makeCopy(temp)); //[red, green, blue, yellow] players by index
    this.board = [
      AppComponent.makeCopy(temp),
      AppComponent.makeCopy(temp),
      AppComponent.makeCopy(temp),
      AppComponent.makeCopy(temp)
    ]; //[red, green, blue, yellow] players by index
    this.playerRoleNow = AppComponent.randomNumber(0, 3);
    this.lastSep = AppComponent.randomNumber(1, 6);
  }

  dice() {
    this.lastSep = AppComponent.randomNumber(1, 6);
    if (this.lastSep == 6) {
      const targetPlayer = this.board[this.playerRoleNow];
      targetPlayer[0]["location"] = 0;
      return;
    }
    this.playerRoleNow = ++this.playerRoleNow % 4;
  }

  getFreeTokens(tokenIndex: number): string {
    return (this.board[tokenIndex] as Array<Object>)
      .filter(e => !e["location"])
      .map((e, i) => this.getTokenIndexToSymbol(tokenIndex) + i)
      .join(" ");
  }

  getLocationInfo(locationIndex: number): string {
    return this.board
      .map(e =>
        e
          .filter(e => e["location"] == locationIndex)
          .map(e => this.getTokenIndexToSymbol(locationIndex) + e["indexAt"])
      )
      .filter(e => e.length != 0)
      .join(" ");
  }

  getTokenIndexToSymbol(index: number) {
    return index == 0 ? "R" : index == 1 ? "G" : index == 2 ? "Y" : "B";
  }

  static makeCopy<T>(target: T): T {
    return JSON.parse(JSON.stringify(target));
  }

  static randomNumber(from: number, to: number) {
    /*Debugging code */
    if (from == 1 && to == 6) {
      // debugger;
      return 6;
    }
    /*Debugging code */
    if (to <= from) {
      return 0;
    }
    return (Number((Math.random() * 100).toFixed(0)) % (to - from + 1)) + from;
  }
}
