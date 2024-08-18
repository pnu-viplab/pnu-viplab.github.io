/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/2/index.html","ea0f834478a642720e24f3ce9538feca"],["/3/index.html","43412c05ecec97263bf34d4e63e8f614"],["/4/index.html","361e4ba43c0c5306c9aecc8d4b48264f"],["/404.html","8366916d152b492a4b60b7ca6780b98c"],["/5/index.html","5273f444b05f3c5240391c88e4e32554"],["/6/index.html","2b5f2b41ba5f93c612c234fa15c18f62"],["/about/index.html","a7cc5f1b12241fe0a3f534fe26c8f1d0"],["/assets/css/main.css","8f2a79483aba681d91c7a1a1e218b514"],["/assets/img/favicon.jpg","ffb9f5c8afdda7fa4f3fd697e5147182"],["/assets/img/gallery/240626_IEIE_Summer_2024.png","e91876a6af243bca82f23e832bb6463d"],["/assets/img/gallery/240813_KCCV_2024.png","e85df8e4264cebb5763799b9cf0114cc"],["/assets/img/icons/android-chrome-192x192.png","4df4c8779d47bcaa69516050281773b9"],["/assets/img/icons/android-chrome-256x256.png","939ec88a61f407945a27d867fca1651d"],["/assets/img/icons/apple-touch-icon.png","366666899d15cf8f6811cc73ee0d63de"],["/assets/img/icons/favicon-16x16.png","f625044491b20a5df78571ba266cbcf6"],["/assets/img/icons/favicon-32x32.png","67502381e45848a4ab76123364675ffe"],["/assets/img/icons/icon-github.svg","4e06335104a29f91e08d4ef420da7679"],["/assets/img/icons/icon-instagram.svg","1e1119e2628235ee4c8771bff15eb2ca"],["/assets/img/icons/icon-twitter.svg","30551913d5399d6520e8a74b6f1e23f0"],["/assets/img/icons/mstile-150x150.png","1cea2ceb806d1a018330a51a1d8b73b6"],["/assets/img/icons/safari-pinned-tab.svg","398ef6b25c0f7f3f6e54c112a8facc5f"],["/assets/img/posts/221118_TeamVIP_ADAI.jpg","2cb2d38c7361d9f5feb529d99deed65d"],["/assets/img/posts/221118_TeamVIP_ADAI_lg.jpg","2cb2d38c7361d9f5feb529d99deed65d"],["/assets/img/posts/221118_TeamVIP_ADAI_md.jpg","2cb2d38c7361d9f5feb529d99deed65d"],["/assets/img/posts/221118_TeamVIP_ADAI_placehold.jpg","2cb2d38c7361d9f5feb529d99deed65d"],["/assets/img/posts/221118_TeamVIP_ADAI_sm.jpg","2cb2d38c7361d9f5feb529d99deed65d"],["/assets/img/posts/221118_TeamVIP_ADAI_thumb.jpg","2cb2d38c7361d9f5feb529d99deed65d"],["/assets/img/posts/221118_TeamVIP_ADAI_thumb@2x.jpg","2cb2d38c7361d9f5feb529d99deed65d"],["/assets/img/posts/221118_TeamVIP_ADAI_xs.jpg","2cb2d38c7361d9f5feb529d99deed65d"],["/assets/img/posts/230410_Sciport.jpg","30379918406ce6a9f4b863542520af5a"],["/assets/img/posts/230410_Sciport_lg.jpg","30379918406ce6a9f4b863542520af5a"],["/assets/img/posts/230410_Sciport_md.jpg","30379918406ce6a9f4b863542520af5a"],["/assets/img/posts/230410_Sciport_placehold.jpg","30379918406ce6a9f4b863542520af5a"],["/assets/img/posts/230410_Sciport_sm.jpg","30379918406ce6a9f4b863542520af5a"],["/assets/img/posts/230410_Sciport_thumb.jpg","30379918406ce6a9f4b863542520af5a"],["/assets/img/posts/230410_Sciport_thumb@2x.jpg","30379918406ce6a9f4b863542520af5a"],["/assets/img/posts/230410_Sciport_xs.jpg","30379918406ce6a9f4b863542520af5a"],["/assets/img/posts/230410_SignLanguage.jpg","743e4e399965c66a3fb2433bdc2ad33d"],["/assets/img/posts/230410_SignLanguage_lg.jpg","743e4e399965c66a3fb2433bdc2ad33d"],["/assets/img/posts/230410_SignLanguage_md.jpg","743e4e399965c66a3fb2433bdc2ad33d"],["/assets/img/posts/230410_SignLanguage_placehold.jpg","743e4e399965c66a3fb2433bdc2ad33d"],["/assets/img/posts/230410_SignLanguage_sm.jpg","743e4e399965c66a3fb2433bdc2ad33d"],["/assets/img/posts/230410_SignLanguage_thumb.jpg","743e4e399965c66a3fb2433bdc2ad33d"],["/assets/img/posts/230410_SignLanguage_thumb@2x.jpg","743e4e399965c66a3fb2433bdc2ad33d"],["/assets/img/posts/230410_SignLanguage_xs.jpg","743e4e399965c66a3fb2433bdc2ad33d"],["/assets/img/posts/231030_ADAI.jpg","7c073df1c20f0f00b5ba87ad2527c367"],["/assets/img/posts/231030_ADAI_lg.jpg","7c073df1c20f0f00b5ba87ad2527c367"],["/assets/img/posts/231030_ADAI_md.jpg","7c073df1c20f0f00b5ba87ad2527c367"],["/assets/img/posts/231030_ADAI_placehold.jpg","7c073df1c20f0f00b5ba87ad2527c367"],["/assets/img/posts/231030_ADAI_sm.jpg","7c073df1c20f0f00b5ba87ad2527c367"],["/assets/img/posts/231030_ADAI_thumb.jpg","7c073df1c20f0f00b5ba87ad2527c367"],["/assets/img/posts/231030_ADAI_thumb@2x.jpg","7c073df1c20f0f00b5ba87ad2527c367"],["/assets/img/posts/231030_ADAI_xs.jpg","7c073df1c20f0f00b5ba87ad2527c367"],["/assets/img/posts/231203_PNUAI_prj.jpg","4bc9326f15c1a0877c9af7c868b2c04a"],["/assets/img/posts/231203_PNUAI_prj_lg.jpg","4bc9326f15c1a0877c9af7c868b2c04a"],["/assets/img/posts/231203_PNUAI_prj_md.jpg","4bc9326f15c1a0877c9af7c868b2c04a"],["/assets/img/posts/231203_PNUAI_prj_placehold.jpg","4bc9326f15c1a0877c9af7c868b2c04a"],["/assets/img/posts/231203_PNUAI_prj_sm.jpg","4bc9326f15c1a0877c9af7c868b2c04a"],["/assets/img/posts/231203_PNUAI_prj_thumb.jpg","4bc9326f15c1a0877c9af7c868b2c04a"],["/assets/img/posts/231203_PNUAI_prj_thumb@2x.jpg","4bc9326f15c1a0877c9af7c868b2c04a"],["/assets/img/posts/231203_PNUAI_prj_xs.jpg","4bc9326f15c1a0877c9af7c868b2c04a"],["/assets/img/posts/240626_IEIE.jpg","4f2371b58d61d6a7f9b19b1f68fb95c4"],["/assets/img/posts/240626_IEIE_lg.jpg","4f2371b58d61d6a7f9b19b1f68fb95c4"],["/assets/img/posts/240626_IEIE_md.jpg","4f2371b58d61d6a7f9b19b1f68fb95c4"],["/assets/img/posts/240626_IEIE_placehold.jpg","4f2371b58d61d6a7f9b19b1f68fb95c4"],["/assets/img/posts/240626_IEIE_sm.jpg","4f2371b58d61d6a7f9b19b1f68fb95c4"],["/assets/img/posts/240626_IEIE_thumb.jpg","4f2371b58d61d6a7f9b19b1f68fb95c4"],["/assets/img/posts/240626_IEIE_thumb@2x.jpg","4f2371b58d61d6a7f9b19b1f68fb95c4"],["/assets/img/posts/240626_IEIE_xs.jpg","4f2371b58d61d6a7f9b19b1f68fb95c4"],["/assets/img/posts/240701_LGE_Members.jpg","a880c6460bc44f4523893a77fb131fa9"],["/assets/img/posts/240701_LGE_Members_lg.jpg","a880c6460bc44f4523893a77fb131fa9"],["/assets/img/posts/240701_LGE_Members_md.jpg","a880c6460bc44f4523893a77fb131fa9"],["/assets/img/posts/240701_LGE_Members_placehold.jpg","a880c6460bc44f4523893a77fb131fa9"],["/assets/img/posts/240701_LGE_Members_sm.jpg","a880c6460bc44f4523893a77fb131fa9"],["/assets/img/posts/240701_LGE_Members_thumb.jpg","a880c6460bc44f4523893a77fb131fa9"],["/assets/img/posts/240701_LGE_Members_thumb@2x.jpg","a880c6460bc44f4523893a77fb131fa9"],["/assets/img/posts/240701_LGE_Members_xs.jpg","a880c6460bc44f4523893a77fb131fa9"],["/assets/img/posts/emile-perron-190221.jpg","4705474281b975b7a213b96e71f772e7"],["/assets/img/posts/emile-perron-190221_lg.jpg","aafe35b1dc6d9dc9293c8c2ef4121046"],["/assets/img/posts/emile-perron-190221_md.jpg","03ed35ed656429599daba312f0990a0f"],["/assets/img/posts/emile-perron-190221_placehold.jpg","67f40708f69ab671cee04d624258b85c"],["/assets/img/posts/emile-perron-190221_sm.jpg","4ce4178a62d5a456e90e7bc47bde50f5"],["/assets/img/posts/emile-perron-190221_thumb.jpg","f20085dfe2e36854f8a12f1fd6c50425"],["/assets/img/posts/emile-perron-190221_thumb@2x.jpg","b8fa22c3237de529316037f093b9cb4d"],["/assets/img/posts/emile-perron-190221_xs.jpg","ac32cbd525d72e932499668af5647d03"],["/assets/img/posts/shane-rounce-205187.jpg","bb774d6e05b2b55ffdabe11a8aac7c56"],["/assets/img/posts/shane-rounce-205187_lg.jpg","83cd838024fff9c3faec59fa1da97872"],["/assets/img/posts/shane-rounce-205187_md.jpg","628cf27bf658cf6de9df79ab9bf2cb2d"],["/assets/img/posts/shane-rounce-205187_placehold.jpg","249fc4a09bcfcbd7d5764f14c14ae82e"],["/assets/img/posts/shane-rounce-205187_sm.jpg","a2400a468e10d7d64528ac9c6bc3b6f0"],["/assets/img/posts/shane-rounce-205187_thumb.jpg","c3b2dd0d95a6d3a44d7702f8c06b1e78"],["/assets/img/posts/shane-rounce-205187_thumb@2x.jpg","b0722b63a92c92a44cd92c0201fc92a4"],["/assets/img/posts/shane-rounce-205187_xs.jpg","cd58fd23f3b3c1de2183beb9ed08327b"],["/assets/img/posts/sleek.jpg","a32252a618ffe8ae57c9ce9ab157a01b"],["/assets/img/posts/sleek_lg.jpg","95a1338aa524727f34950f269133e904"],["/assets/img/posts/sleek_md.jpg","4e35ceb2f5fffd3d758fade699b0b85a"],["/assets/img/posts/sleek_placehold.jpg","0f48050cd7776895b98c6ce21597ff39"],["/assets/img/posts/sleek_sm.jpg","f30af3d30b7df905d962e494750f5da0"],["/assets/img/posts/sleek_thumb.jpg","f7b8a94ac9da8e5ea36bb9e459872400"],["/assets/img/posts/sleek_thumb@2x.jpg","e67e2129dc58a100b98a5e027c964dbc"],["/assets/img/posts/sleek_xs.jpg","c8212cace6d446950556a3bf6efe4520"],["/assets/img/publication/AAAI24_CMDA.png","111ae3d4a0a8aa90eb5fabe245d23d21"],["/assets/img/publication/ACCV22_DCP.png","5398534b22506a4d15935d9446e824c1"],["/assets/img/publication/Access22_PSDataset.png","17545890e3eeda46e833de8138022510"],["/assets/img/publication/CVIU22_MCCalib.png","81fed6311ab5524a8e6668431b834890"],["/assets/img/publication/CVPR15_Teaser.png","95af256959871dbafad6146924578a06"],["/assets/img/publication/CVPR17_Teaser.png","d1c3e49dc99c03838a42c1dd36e1579c"],["/assets/img/publication/CVPR20_RefSR.png","2a977e955d37eea672f521f7f2ab785c"],["/assets/img/publication/CVPR23_ThermalDepth.png","5b2062f34cab1f125b3e40752540f71e"],["/assets/img/publication/CVPRW17_Teaser.png","7b06ab97926af27db44e89b5fe1001bf"],["/assets/img/publication/ECCV20_NLSPN.png","522ff883d2227f69dc2ae712a24727ef"],["/assets/img/publication/Electronics21_Steganography.png","8f00395bb0d28ccb49ba16fc0efa6488"],["/assets/img/publication/Electronics22_RefSR.png","9e275a9800577af949bb70f1aedce82f"],["/assets/img/publication/FCV17_Teaser.png","e20910ae6d7c27b622e8ee3d41a7f815"],["/assets/img/publication/FCV18_Best_Demo_Award.png","4eb7d32096e006a797574320b92539b9"],["/assets/img/publication/FCV18_Teaser.png","d7ab61bed408c38f1bd03497e3e02b64"],["/assets/img/publication/ICCV17_Teaser.png","877e0d03ad8b79da10bf537f2bea510f"],["/assets/img/publication/IJCV22_SeeThrough.png","fc17bfae9ee062c233502f0d58d9172f"],["/assets/img/publication/IROS19_AE.png","d71a25c1bac96c441f0a743af2af9983"],["/assets/img/publication/IROS19_Sensor.png","34a2c80c48bd19f44ef131ddab095da5"],["/assets/img/publication/OE22_MiniPS.png","d85623f172437e751b3609290b227f14"],["/assets/img/publication/PRL18_Teaser.png","23bc97a3aaea92eb031d0c7a99bfd5d5"],["/assets/img/publication/PRL24_CrossFormer.png","2296cd5a678e7e84d4e7e3b43b5fd104"],["/assets/img/publication/RAL24_ADNet.png","930a5cd30b86cd8697d82e8a5461b866"],["/assets/img/publication/RAL24_IAM.png","436609cc3d4da638de76df01ca0480a1"],["/assets/img/publication/RAL_ICRA22_MMDCE.png","bf5ae3aed2599b30ac0f615059e233cd"],["/assets/img/publication/RAL_IROS21_MS_UDA.png","8dc59826f3431c3d7fd937d231108867"],["/assets/img/publication/SPL20_SPKD.png","119120c6221341bce718a253b8fde8e4"],["/assets/img/publication/SPL21_LLKD.png","491aa26a22fb327508becb2c6636e269"],["/assets/img/publication/Sensors22_LSPKD.png","5d8d070bd47ce851a88842fcd00dcd1e"],["/assets/img/publication/TPAMI18_PS_RF_Teaser.png","0c125728759057cb803d170fc499a028"],["/assets/img/publication/URAI16_Teaser.png","c6f551c6818816568df2cdd6187d1459"],["/assets/img/publication/WACV20_PASSD.png","97e05e9077848ed4083544b87f165da7"],["/assets/img/publication/jspark.png","cd22da74d7da4c6be3f96476fe1974b8"],["/assets/img/research/semantic_segmentation.png","3c01677779dce4443acc53ee98baec14"],["/assets/img/research/super_resolution.png","2bdb8dc329a66f32e2b7e3ee7592d3e9"],["/assets/img/team/beomsoo_kim.jpg","062c0c1c6b31916834a02ea8a0739141"],["/assets/img/team/changjin_lee.png","1bed699e0131d07d4c1d96e6ca07c0bf"],["/assets/img/team/chanill_park.jpg","2595159a979ea88dc997c83924829a95"],["/assets/img/team/dogyu_kim.jpg","f004ce574267704de2a0adfed963099c"],["/assets/img/team/dummy.jpg","f5bf3c851202c48c9e8cc391fd09006b"],["/assets/img/team/incheol_park.jpg","11a201cffd26511ffd8abd788117c0e3"],["/assets/img/team/jaehyeong_park.jpg","7e93a30aab37d7dd4388116bed88af0d"],["/assets/img/team/janghyun_kim.jpg","e2128b7ae901b237189ccff306f8e7ac"],["/assets/img/team/jeonghyun_noh.jpg","abe113711aabd8c165f86149c4fd93fa"],["/assets/img/team/jinwan_kim.jpg","6c1c82e87b97b8e83d63e6596a9247d5"],["/assets/img/team/mingyu_jeong.jpg","9eb78c200afbc4bd149da7df00ae3f6d"],["/assets/img/team/minseong_kweon.jpg","2e6bf4758178c92b3d7cab19c5b91b52"],["/assets/img/team/minsu_jeon.jpg","e79ec38ad7a29f88b8c8734fb064e37c"],["/assets/img/team/prof.jpg","f204e2e7e7bae980a8698efda3666266"],["/assets/img/team/seokyong_heo.jpg","5acc2327c68b5a0a61e4146973dab7fa"],["/assets/img/team/seongheon_ha.jpg","397f98ed5b00ecf0aaa0bb5fe47e61a3"],["/assets/img/team/seunghyeon_cheon.jpg","abdfdacf5972f6cc70de0372ede5adde"],["/assets/img/team/seungik_lee.jpg","e4534d208c066049de566371b8f1cf95"],["/assets/img/team/yeogyeong_kim.jpg","aa814343082ce4fc7e549fda6e4b43f1"],["/assets/img/team/yerin_nam.jpg","a0c8ac898e83f7966e3e16c35719f30b"],["/assets/img/team/yonghyeon_jo.jpg","af39952b795a355ed9b2849633a2efe7"],["/assets/js/bundle.js","ff871e9e292bfcd393cf1996b5e9284a"],["/categories/index.html","f1ce3364680827bded9a8cb7a903b691"],["/contact/index.html","d9c65b2093bc059bcb86cdeb3a817fb4"],["/etc/2016-05-20-super-long-article.html","875fedb9e2ef8544781a626e2762c691"],["/etc/2016-05-20-welcome-to-jekyll.html","ce9f0bbfaeafdf29f8b77f672b44b9e7"],["/etc/2017-10-15-markdown-cheatsheet.html","5e2d8057092a0cc08d4bd8e3a601b38d"],["/etc/2017-11-26-getting-started.html","9ae6df5e75dbd7d93c3e705cb54660fc"],["/gallery/index.html","456760d5bb83df764861693f8b3f9080"],["/gulpfile.babel.js","499ef2edde6e9b4fbafcb7c6f0cbc725"],["/index.html","cd6a985be27d3f6cb020f69477e1f3b6"],["/lecture/index.html","6b0b6099a7708c8d69ff66001e480a55"],["/news/2021/09/28/210928_news.html","39f712f2d19994c556793805717ce21d"],["/news/2021/12/13/211213_spl_llkd.html","98ee422f2235215dbb493f4d8fad82c9"],["/news/2022/01/04/220104_ijcv_seethrough.html","3605896dcd46d0b1d3f28af87825659a"],["/news/2022/01/12/220112_cviu_mccalib.html","18afc727a1eed5804f9d2a3c64c511cb"],["/news/2022/02/01/220201_ral_icra_mmdce.html","c111f5cc712ce418c8b94ee7f79ac78e"],["/news/2022/03/02/220302_new_members.html","c4a3cef993b20441c3607641e4e93e98"],["/news/2022/09/01/220901_new_members.html","0a8043bcef62df7519d739d66fe9ae4c"],["/news/2022/09/17/220917_accv.html","3963c9f71fe69ec84b9b3fafbc1b2a23"],["/news/2022/09/22/220922_oe.html","16d9c1241db5c4727982b67919ce9f95"],["/news/2022/09/22/220922_sensors.html","843fae48cbabeab37623bb4cc8a226c4"],["/news/2022/10/09/221009_access.html","5a9356025423313b77b71b927ef57fb0"],["/news/2022/11/18/221118_adai.html","58136cd1d604d8f13eac486145a93a8b"],["/news/2023/03/01/230301_new_members.html","eb4a53ed9ad9a6690d4ba132f49345cc"],["/news/2023/03/02/230302_cvpr.html","52bc2daeeb3de75a8330cb375ba80755"],["/news/2023/04/10/230410_signlanguage.html","7e3e8e19c0b6849634a4db0423ec1c4d"],["/news/2023/09/01/230901_new_members.html","8f3370b1726e344cb1db029e287b4547"],["/news/2023/10/30/231030_adai.html","897c2854b3c0d1603d7d9a0f350c7eb8"],["/news/2023/12/03/231203_pnuai_student_project.html","e842c53a3a428cc43d50463091503386"],["/news/2023/12/09/231209_aaai.html","ed7f267c20d28d42520e07acb4f773c8"],["/news/2024/02/13/240213_prl.html","611642a84f0222d83cb05877983a84d6"],["/news/2024/03/01/240301_new_members.html","96f9b8bc06693bc292a9dbf2a2597382"],["/news/2024/06/20/240620_ral.html","71b04b121ea1a7966444562f818ddf59"],["/news/2024/06/26/240626_IEIE.html","847203c2f676719d6a44ca8a458b2ec1"],["/news/2024/07/01/240701_LGE_Members.html","5ac139c9ce3703fa82189d35a03a7a0a"],["/notice/2021/12/14/211214_recruit.html","5fbc1cd6119cd055f21f9f2e3c9b3965"],["/notice/2022/09/01/220901_recruit.html","5cd5bca6ff36dae5c250d974c616d9ea"],["/notice/2023/03/03/230303_recruit.html","21c99f676c53f448d57ba9a508876e8f"],["/publication/index.html","c8efc01a80633e05a4072cf1a27d4aca"],["/research/index.html","e389e8ac168e7dad5574380aad644d7c"],["/sw.js","f15e904d728c73d8369bf294dcac78f8"],["/team/index.html","dd84367342163340754a643d561ceeb8"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







