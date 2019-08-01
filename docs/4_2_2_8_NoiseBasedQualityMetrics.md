## Noise-Based Quality Metrics
还有一种质量评估方法不是通过评估信号的保真度，而是通过评估引入的噪声来评估视频的质量。

### Noise Quality Measure
在噪声质量测量（*NQM, noise quality measure*）[^38]中，劣化图像被建模为线性频率失真和注入加性噪声（*additive noise*）的原始图像。NQM认为这两种噪声源是独立的，并且解耦为两种质量测量：

1. 频率失真导致的失真测量（*DM, distortion measure*）
2. 加性噪声导致的噪声质量测量（*NQM, noise quality measure*）

NQM是一种基于对比金字塔（*CP, Contrast Pyramid*）[^39]的测量指标，并会考虑以下因素：

* 对比灵敏度会随着距离，图像尺寸以及空间频率的变化而变化
* 局部亮度平均值也会发生变化
* 空间频率之间的对比度之间会相互作用
* 对比度会产生掩蔽效应

对于加性噪声，非线性NQM比PSNR、线性质量测量的效果要更好。

计算DM分为三步：

1. 找到劣化图像中的频率失真
2. 计算该频率失真与单位增益（*unity gain*）（即无失真）的全通响应的偏差
3. 利用HVS的频率响应模型对偏差进行加权，并且在可见频率上对得到的加权偏差进行积分




[^38]: Image Quality Assessment Based on a Degradation Model. 

[^39]: 对比度金字塔源于图像的高斯金字塔分解。最高级第N级对比度金字塔是其高斯金字塔本身，除此 以外各级对比度金字塔是这一级的高斯金字塔的图像与上一级作扩大后图像之比，即上一级扩大后的图像被看作为背景，比值含有对比度的意义，故称对比度金字塔。[基于金字塔方法的图像融合原理及性能评价](http://www.cnki.com.cn/Article/CJFDTOTAL-JSYJ200410046.htm)