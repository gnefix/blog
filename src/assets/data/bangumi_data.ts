const bangumi_data: Bangumi[] =  [
  {
    "name": "摇曳百合",
    "watch_time": "2012年4月",
    "description": "七森中学“茶道社”废社后的原茶道社教室，被4个女生占据了，成为“<span id='text2' >娱乐社</span>”消耗时间的地方。时而欢笑、时而<span class='decoration-4 underline decoration-pink-500/30'>百合</span>的<span id='text1'>日常</span><span style='color: #e37cf1'>百合</span>生活就这样开始了。",
    "link": "https://yuruyuri.com/10th",
    "script":"src/assets/js/bangumi/yuruyuli.ts"
  },{
    "name": "悠哉日常大王",
    "watch_time": "2012年4月",
    "description": "在一个挂着<span style=' white-space: nowrap;' id='text1'>“牛横断注意”</span>的看板，公车不等上5个小时不会来的乡下。主角一条萤因父亲工作调职的关系从东京迁居此地，进入“旭丘分校”就读，全校只有<span id='text2' style=' white-space: nowrap;'>5位学生</span>，位于<span style=' white-space: nowrap;' id='text3'>超偏远乡下</span>的旭丘分校，是一个被丰富的自然景色所包围的学校。在乡间里的学校，每天都有愉快的时光。朋友们同在一起，就是<span class='text-indigo-300'>悠悠哉哉的日常</span>。",
    "link": "https://nonnontv.com/tvanime",
    "script":"src/assets/js/bangumi/nonnon.ts"
  },{
    "name": "前进吧！登山少女",
    "watch_time": "2013年1月",
    "description": "喜好室内活动并且有恐高症的主人公雪村葵与有着户外活动意向的青梅竹马日向的再会作为契机，两人为了能再次看到年幼时看过的山顶日出而登山的故事",
  },{
    "name": "日常",
    "watch_time": "2012年4月",
    "description": "",
  }
]

export default bangumi_data;

export interface Bangumi {
  name: string;
  watch_time: string;
  images?: string[];
  anime?: string;
  cover?: string;
  script?: string;
  link?: string;
  description?: string;
  broadcast_status?: number;
}