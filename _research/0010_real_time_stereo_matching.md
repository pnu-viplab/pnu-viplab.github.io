---
title: Real-time Stereo Matching
layout: post
slug: 0010-real-time-stereo-matching
images:
  - /assets/img/research/0010_real_time_stereo_matching_01.webm
  - /assets/img/research/0010_real_time_stereo_matching_02.png
  - /assets/img/research/0010_real_time_stereo_matching_03.png
description: "Confidence 기반 Refinement를 통한 실시간 스테레오 매칭 기법 연구"
---

<video autoplay loop muted playsinline style="width:100%;"><source src="/assets/img/research/0010_real_time_stereo_matching_01.webm" type="video/webm"></video>
<img src="/assets/img/research/0010_real_time_stereo_matching_02.png" style="width:100%;" />
<img src="/assets/img/research/0010_real_time_stereo_matching_03.png" style="width:100%;" />

## Abstract (Eng)

In this paper, we propose a novel real-time disparity refinement method that enables precise structure perception. We construct a compact full-resolution cost volume from residuals around the initial disparity and adaptively eliminate redundant information on a per-pixel basis by leveraging the confidence. The core idea of our method comprises residual cost volume construction and an adaptive range masking strategy. The residual cost volume is constructed from refinement candidates around the initial disparity, based on the assumption that the ground-truth disparity is near the initial disparity. Compared to the conventional cost volume constructed over the entire set of disparity candidates, our approach achieves computational efficiency and maintains precise structural information by operating at full-resolution. Moreover, we propose an adaptive range masking strategy that filters refinement candidates for each pixel by leveraging confidence values. This approach effectively eliminates redundant information present in cost volumes that are composed of uniformly sampled refinement candidates. Experimental results on the Scene Flow and KITTI 2012 benchmarks demonstrate that our method achieves real-time performance and sets a new state-of-the-art among real-time stereo matching algorithms.

## Abstract (Kor)

본 논문에서는 정밀한 구조 인식을 가능하게 하는 새로운 실시간 시차 보정 방법을 제안합니다. 제안하는 방법은 초기 시차 주변의 잔차를 기반으로 한 컴팩트한 고해상도 비용 볼륨(cost volume)을 구성하고, 신뢰도를 활용하여 픽셀 단위로 중복 정보를 선택적으로 제거합니다. 본 방법의 핵심은 잔차 비용 볼륨 구성과 적응적 범위 마스킹 전략으로 이루어져 있습니다. 잔차 비용 볼륨은 실제 정답 시차가 초기 시차 근처에 존재한다는 가정하에, 초기 시차 주변의 보정 후보들로부터 생성됩니다. 이는 전체 시차 후보 집합에 대해 비용 볼륨을 구성하는 기존 방식과 달리, 고해상도를 유지하면서도 계산 효율성을 확보하고 정밀한 구조 정보를 효과적으로 보존할 수 있습니다. 또한, 신뢰도 값을 활용하여 각 픽셀마다 보정 후보를 선택적으로 필터링하는 적응적 범위 마스킹 전략을 제안합니다. 해당 전략은 균일하게 샘플링된 보정 후보들로 구성된 비용 볼륨에 포함된 불필요하고 중복된 정보를 효과적으로 제거합니다. Scene Flow와 KITTI 2012 벤치마크에서 수행한 실험 결과를 통해, 제안한 방법은 실시간 성능을 달성함과 동시에 실시간 스테레오 매칭 알고리즘 분야에서 새로운 최고 성능(State-of-the-Art)을 기록함을 확인하였습니다.

## 핵심 목표

본 논문의 핵심 목표는 초기 시차 추정 결과를 기반으로, 실시간 환경에서도 정밀한 구조 인식이 가능한 시차 보정 방법을 제안하는 것입니다. 본 연구는 초기 시차 주변의 제한된 후보만을 활용하는 효율적인 비용 볼륨 구성과 신뢰도 기반의 적응적 후보 선택을 통해, 실시간 성능과 높은 정밀도를 동시에 달성하는 것을 목표로 합니다. 이를 통해 자율주행, 로봇 비전 등 실시간 처리가 요구되는 실제 환경에서 신뢰할 수 있는 스테레오 깊이 인식을 제공하고자 합니다.

## 주요 아이디어 및 방법

### 1) Residual Cost Volume 구성

기존 방식은 전체 시차 범위에 대해 비용 볼륨을 구성하는 반면, 본 연구에서는 정답 시차가 초기 시차 근처에 존재한다는 가정에 기반하여, 초기 시차 주변의 잔차 후보들만을 사용해 비용 볼륨을 구성합니다. 이를 통해 계산량을 크게 줄이면서도, 고해상도에서 정밀한 구조 정보를 유지할 수 있습니다. 이러한 잔차 기반 비용 볼륨은 불필요한 시차 후보를 배제하고, 보정에 필요한 핵심 정보만을 효율적으로 담도록 설계되었습니다.

### 2) Full-resolution Cost Volume을 통한 구조 보존

제안하는 방법은 비용 볼륨을 다운샘플링하지 않고 원본 해상도에서 직접 구성함으로써, 물체 경계나 세밀한 구조 정보가 손실되지 않도록 합니다. 이는 얇은 구조물이나 경계 영역에서 발생하는 기존 방법의 한계를 효과적으로 완화합니다.

### 3) Adaptive Range Masking 전략

본 논문에서는 신뢰도를 활용한 적응적 범위 마스킹 기법을 제안합니다. 픽셀별 신뢰도 값을 기반으로, 각 위치마다 필요한 시차 보정 후보만을 선택적으로 유지하고 나머지 중복되거나 불필요한 후보들은 제거합니다. 이를 통해 균일하게 샘플링된 시차 후보들로 인해 발생하는 중복 정보 문제를 효과적으로 해결하고, 비용 볼륨의 표현 효율을 크게 향상시킵니다.

### 4) 실시간 성능을 고려한 효율적 설계

잔차 비용 볼륨과 적응적 범위 마스킹을 결합함으로써, 본 방법은 연산량을 크게 줄이면서도 높은 정확도를 유지합니다. 이로 인해 고성능 GPU뿐만 아니라 실시간 응용 환경에서도 적용 가능한 구조를 갖습니다.