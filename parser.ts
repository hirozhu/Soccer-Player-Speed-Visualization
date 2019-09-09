import * as fs from 'mz/fs';
import * as path from 'path';
import * as readline from 'readline';
import { Parser } from 'parser';
import * as fastcsv from 'fast-csv';

type Player = {
    playerId: number;
    speed: number;
}

type FrameInfo = {
    frameIdx: number;
    homePlayers: Player[];
    awayPlayers: Player[];
}

type SpeedInfo = {
    frameIdx: number;
    playerId: number;
    speed: number;
}

async function readDir(dirPath: string): Promise<string> {
  return fs.readdir(dirPath);
}

export class PlayerSpeedParser implements Parser {
  filename: string;
  data: SpeedInfo[] = [];

  constructor(filename: string) {
    this.filename = filename;
  }

  async parse(frameInfo: FrameInfo): Promise<void> {

    let homePlayers = frameInfo.homePlayers;
    let awayPlayers = frameInfo.awayPlayers;

    for (const homePlayer of homePlayers){
      let speedInfo: SpeedInfo = {
        frameIdx: frameInfo.frameIdx,
        playerId: homePlayer.playerId,
        speed: homePlayer.speed
      };
      this.data.push(speedInfo);
    }

    for (const awayPlayer of awayPlayers){
      let speedInfo: SpeedInfo = {
        frameIdx: frameInfo.frameIdx,
        playerId: awayPlayer.playerId,
        speed: awayPlayer.speed
      };
      this.data.push(speedInfo);
    }
  }

  async importPlayerSpeeds(filename: string): Promise<void> {
    const stream = fs.createReadStream(filename);

    const reader = readline.createInterface(stream);
    /* tslint:disable */
    for await (const line of reader) {
      try {
        const frameInfo: FrameInfo = JSON.parse(line);
        this.parse(frameInfo);
      } catch (e) {
        console.log(e);
      }
    }

    reader.close();
    stream.close();
  }

  async start() {
    await this.importPlayerSpeeds(this.filename);
  
    const ws = fs.createWriteStream("player_speed.csv");
    fastcsv
      .write(this.data, { headers: true })
      .pipe(ws);
  }
}