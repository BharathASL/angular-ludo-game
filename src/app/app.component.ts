import { Component } from "@angular/core";

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
    const temp = [
      { location: null, red_carpet: null, indexAt: 0 },
      { location: null, red_carpet: null, indexAt: 1 },
      { location: null, red_carpet: null, indexAt: 2 },
      { location: null, red_carpet: null, indexAt: 3 }
    ];
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
    const targetPlayer = this.board[this.playerRoleNow];
    if (this.lastSep != 6) {
      targetPlayer[0]["location"] += this.lastSep;
      this.playerRoleNow = ++this.playerRoleNow % 4;
    }
    var freeTokens = targetPlayer.filter(e => e["location"] == null);
    if (freeTokens.length == 0) {
      targetPlayer[0]["location"] += this.lastSep;
      return;
    }
    freeTokens[0]["location"] = 0;
    return;
  }

  boardClicked() {
    console.log(event);
  }

  getFreeTokens(tokenIndex: number): string {
    return (this.board[tokenIndex] as Array<Object>)
      .filter(e => e["location"] == null)
      .map((e, i) => this.getTokenIndexToSymbol(tokenIndex) + +e["indexAt"])
      .join(" ");
  }

  getLocationInfo(locationIndex: number): string {
    return this.board
      .map((e, i) =>
        e
          .filter(e => e["location"] == locationIndex)
          .map(e => this.getTokenIndexToSymbol(i) + e["indexAt"])
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
    if (from == 0 && to == 3) {
      return 0;
    }
    if (from == 1 && to == 6) {
      return 6;
    }
    /*Debugging code */
    if (to <= from) {
      return 0;
    }
    return (Number((Math.random() * 100).toFixed(0)) % (to - from + 1)) + from;
  }
}
