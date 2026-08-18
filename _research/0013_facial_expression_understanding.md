---
title: Facial Expression Understanding
layout: post
slug: 0013-facial-expression-understanding
images:
  - /assets/img/research/0013_facial_expression_understanding_01.png
  - /assets/img/research/0013_facial_expression_understanding_02.png
description: "프레임 단위 어텐션 재분배(MiRA)를 활용한 영상 기반 표정 이해 연구"
---

<img src="/assets/img/research/0013_facial_expression_understanding_01.png" style="width:100%;" />
<img src="/assets/img/research/0013_facial_expression_understanding_02.png" style="width:100%;" />

## Abstract (Kor)

본 연구는 영상 속 사람의 **표정을 인식**하는 기술을 다룬다. 표정은 눈가의 순간적인 주름, 살짝 찌푸린 미간, 입꼬리의 미묘한 떨림처럼 아주 작고 순식간에 지나가는 얼굴 움직임에 담겨 있다. 문제는 영상에는 이런 미세한 표정 변화 외에도 고개를 돌리거나 몸을 움직이는 것처럼 훨씬 크고 눈에 띄는 움직임이 섞여 있다는 점이다.

최근 인공지능 영상 인식 모델(Vision Transformer, ViT)은 영상의 어느 부분에 "집중"할지를 스스로 정하는 **어텐션(attention)** 이라는 방식을 사용한다. 그런데 이 집중이 대개 고개 움직임 같은 크고 지배적인 동작에 쏠려 버려서, 정작 표정의 핵심인 미세한 얼굴 변화는 놓치기 쉽다. 마치 사진에서 배경의 큰 움직임에만 눈길이 가서 인물의 작은 표정 변화를 놓치는 것과 같다.

이를 해결하기 위해 본 연구는 **MiRA (Marginal-induced Attention Redistribution)** 를 제안한다. MiRA는 기존 모델의 집중(어텐션)을 **미세한 표정 쪽으로 다시 배분해 주는 보조 장치**로, 모델을 처음부터 다시 학습시키거나 새로운 학습 파라미터를 추가할 필요 없이 **기존 모델에 그대로 끼워 넣기만 하면 되는(plug-in)** 방식이다. MiRA는 두 가지 간단한 기준으로 어느 부분에 집중할지를 다시 정한다.

### 1) 어느 "프레임(장면)"이 중요한가 (Frame-Level Confidence)

영상은 여러 장의 프레임(장면)으로 이루어진다. MiRA는 각 프레임이 전체 영상에서 얼마나 많은 관심을 받는지를 계산하여, 표정 정보가 풍부한 프레임은 더 강조하고, 별다른 변화가 없거나 큰 움직임에만 휩쓸린 프레임은 덜 반영한다.

### 2) 한 프레임 "안에서" 얼마나 좁게 집중하는가 (Intra-Frame Concentration)

한 장면 안에서도 집중이 얼굴 전체에 넓게 퍼져 있는 것보다, 눈가나 입가처럼 특정 부위에 좁게 모여 있을 때 표정 단서를 더 잘 포착한다. MiRA는 집중이 얼마나 한 곳에 모여 있는지를 측정하여, 흩어진 집중보다 국소적으로 뭉친 집중을 더 살린다. 위 두 기준을 합쳐, 최종적으로 미세한 표정에 집중이 향하도록 조정한다.

### 3) 두 가지 동작 방식: 정확한 방식과 빠른 방식

MiRA는 두 가지 방식으로 동작한다. **정확한 방식(Exact Mode)** 은 모델의 집중 결과를 꼼꼼히 다시 계산하여 효과가 크지만 메모리와 연산 비용이 많이 든다. 이를 개선한 **경량 방식(FlashLite Mode)** 은 효율적인 어텐션 연산 기법(FlashAttention)에 재분배 과정을 직접 녹여 넣어, 정확한 방식의 효과는 거의 그대로 유지하면서 훨씬 빠르고 가볍게 동작한다.

이를 통해 MiRA는 얼굴을 미리 정교하게 잘라 정렬하는 것과 같은 번거로운 사전 작업 없이도, 미세한 표정 변화에 집중을 효과적으로 재배분한다. 대규모 영상 표정 인식 실험에서 MiRA는 강력한 기존 모델 대비 일관되게 더 나은 성능을 보였으며, 추가 학습 없이도 실제 영상 환경에 손쉽게 적용할 수 있음을 입증하였다.


## Abstract (Eng)

This study tackles the task of **recognizing facial expressions in videos**. Expressions are conveyed through very small and fleeting facial movements—a momentary wrinkle around the eyes, a slight frown, a subtle twitch of the lips. The difficulty is that videos also contain much larger and more noticeable movements, such as turning the head or shifting the body, which are mixed together with these subtle expression cues.

Modern AI video models (Vision Transformers, ViT) decide where to "focus" using a mechanism called **attention**. However, this focus tends to be dominated by large, conspicuous motions such as head movements, so the subtle facial changes that actually carry the expression are easily missed—much like being drawn to a large background motion in a photo and overlooking a person's slight change of expression.

To address this, we propose **MiRA (Marginal-induced Attention Redistribution)**, an add-on that **redirects a model's focus toward subtle facial cues**. MiRA works as a **plug-in**: it can be inserted into an existing model as-is, without retraining from scratch and **without adding any new trainable parameters**. It re-decides where to focus using two simple criteria.

### 1) Which frame matters most (Frame-Level Confidence)

A video is made up of many frames. MiRA measures how much overall attention each frame receives, giving more weight to frames rich in expression information while downplaying frames that are redundant or swept up in large motions.

### 2) How tightly focused within a frame (Intra-Frame Concentration)

Even within a single frame, attention that is narrowly concentrated on specific regions (e.g., around the eyes or mouth) captures expression cues better than attention spread thinly across the whole face. MiRA measures how concentrated the focus is and favors tightly localized focus over diffuse focus. The two criteria are combined so that attention is ultimately steered toward subtle facial dynamics.

### 3) Two operating modes: accurate and fast

MiRA runs in two modes. The **Exact Mode** carefully recomputes the model's focus for maximum effect, but is memory- and compute-intensive. The lighter **FlashLite Mode** embeds the redistribution directly into an efficient attention technique (FlashAttention), preserving almost all of the Exact Mode's benefit while running much faster and lighter.

Thanks to this design, MiRA effectively redirects attention toward subtle facial changes without cumbersome preprocessing such as tight face cropping and alignment. In large-scale video facial expression recognition experiments, MiRA consistently outperforms strong baseline models and, requiring no additional training, can be applied to real-world video settings with ease.
