import test from "node:test";
import assert from "node:assert/strict";
import { BaseballGame } from "../src/game-engine.js";

const makePlayer=(id,position="CF")=>({id,name:"球員"+id,team:"測試隊",year:2003,position,overall:75,bat:75,power:70,speed:70,field:75,arm:75,contact:75,clutch:75});
const home=Array.from({length:9},(_,i)=>makePlayer("H"+i,i===8?"P":"CF"));
const away=Array.from({length:9},(_,i)=>makePlayer("A"+i,i===8?"P":"CF"));

test("三個好球會形成三振並增加出局數",()=>{
 const game=new BaseballGame(home,away);game.half="bottom";
 game.takePitch({zone:true});game.takePitch({zone:true});game.takePitch({zone:true});
 assert.equal(game.outs,1);assert.equal(game.strikes,0);assert.equal(game.batterIndex.home,1);
});

test("四個壞球會保送並推進壘包",()=>{
 const game=new BaseballGame(home,away);game.half="bottom";
 for(let i=0;i<4;i++)game.takePitch({zone:false});
 assert.equal(game.balls,0);assert.ok(game.bases[0]);assert.equal(game.batterIndex.home,1);
});

test("滿壘全壘打會讓四名跑者得分",()=>{
 const game=new BaseballGame(home,away);game.half="bottom";
 game.bases=[{name:"一壘跑者",speed:60},{name:"二壘跑者",speed:60},{name:"三壘跑者",speed:60}];
 game.applyHit(4,"測試全壘打");
 assert.equal(game.score.home,4);assert.deepEqual(game.bases,[null,null,null]);
});

test("客隊三出局後會正確切換到主隊半局",()=>{
 const game=new BaseballGame(home,away);
 const original=Math.random;Math.random=()=>0.99;
 try{game.simulateAiHalf();}finally{Math.random=original;}
 assert.equal(game.half,"bottom");assert.equal(game.outs,0);
});

test("第九局下半結束且比分相同時進入延長賽",()=>{
 const game=new BaseballGame(home,away);game.inning=9;game.half="bottom";game.outs=2;
 game.addOut();
 assert.equal(game.inning,10);assert.equal(game.half,"top");assert.equal(game.finished,false);
});

test("同一打席連續揮空只在三振時記一次打數",()=>{
 const game=new BaseballGame(home,away);game.half="bottom";
 const original=Math.random;Math.random=()=>0.99;
 try{
  game.swing({zone:true,timingQuality:"Miss"},"contact");
  assert.equal(game.atBats.home,0);
  game.swing({zone:true,timingQuality:"Miss"},"contact");
  assert.equal(game.atBats.home,0);
  game.swing({zone:true,timingQuality:"Miss"},"contact");
 }finally{Math.random=original;}
 assert.equal(game.atBats.home,1);
 assert.equal(game.playerStats.home.H0.AB,1);
 assert.equal(game.playerStats.home.H0.SO,1);
});

test("安打與全壘打會累積球員個人成績",()=>{
 const game=new BaseballGame(home,away);game.half="bottom";
 game.applyHit(4,"測試全壘打");
 const line=game.playerStats.home.H0;
 assert.equal(line.AB,1);assert.equal(line.H,1);assert.equal(line.HR,1);
});
