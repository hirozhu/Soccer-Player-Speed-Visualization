import * as fs from 'mz/fs';
import path from 'path';
import readline from 'readline';
// import { LiveMarking } from '@src/models';
import { Parser } from 'parser';

// type Track = {
//   period: number;
//   frameIdx: number;
//   live: boolean;
// };

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

async function readDir(dirPath: string): Promise<string[]> {
  return fs.readdir(dirPath);
}

export class PlayerSpeedParser implements Parser {
//   markings: LiveMarking[] = [];
  path: string;
  previousLive: boolean = false;
  startLiveFrame: number = 0;
  offset: Map<number, number> = new Map();

  constructor(dirPath: string) {
    this.path = dirPath;
  }

  async parse(frameInfo: FrameInfo): Promise<void> {
      console.log(frameInfo);
    // // start live
    // if (!this.previousLive && track.live) {
    //   this.startLiveFrame = track.frameIdx;

    //   if (!this.offset.has(track.period)) {
    //     this.offset.set(track.period, track.frameIdx);
    //   }
    // }

    // // start dead
    // if (this.previousLive && !track.live) {
    //   const periodOffset = this.offset.get(track.period) || 0;

    //   const marking: LiveMarking = {
    //     startFrame: this.startLiveFrame - periodOffset,
    //     endFrame: track.frameIdx - periodOffset,
    //     period: track.period,
    //     source: 'ssi',
    //   };

    //   this.markings.push(marking);
    //   console.log(marking);
    // }

    // this.previousLive = track.live;
  }

  async importPlayerSpeeds(file: string): Promise<void> {
    const stream = fs.createReadStream(path.join(this.path, file));
    const reader = readline.createInterface(stream);
    /* tslint:disable */
    for await (const line of reader) {
      try {
        const frameInfo: FrameInfo = JSON.parse(line);
        this.parse(frameInfo);
      } catch (e) {
        console.log(line);
        console.log(e);
      }
    }

    reader.close();
    stream.close();
  }

  async start() {
    const files = await readDir(this.path);

    for (const file of files) {
      await this.importPlayerSpeeds(file);
    }
  }
}