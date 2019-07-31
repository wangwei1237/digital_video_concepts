## Spatio-Temporal Approaches（时空方法）
传统的FR客观质量指标没有考虑时间维度的失真，例如帧丢失（*frame drops*）或抖动（*jitter*）。时空（*spatio-temporal*）方法会考虑视频帧之间的运动信息，从而会捕获时间质量的劣化。因此，时空方法更适合于视频信号的质量评估。时空算法通常与HVS之间有很好地相关性。本节将介绍其中的一种方法：时空视频SSIM（*stVSSIM, spatio-temporal video SSIM*）。

### Spatio-Temporal Video SSIM
时空视频SSIM（stVSSIM）[^32]算法是一种基于运动的视频完整性评估（*MOVIE, motion-based video integrity evaluation*）[^33]的全参考的视频质量评估算法。MOVIE利用多尺度时空Gabor滤波器组来分解视频并计算运动矢量。但是，MOVIE具有高计算复杂性，这使得在实际应用中很难实现。因此，stVSSIM提出了一种新的时空度量指标来解决MOVIE的计算复杂性问题。在VQEG的全参考数据集上对stVSSIM算法进行了评估，并且发现stVSSIM算法与人类的感知具备很好的相关性。

对于空间质量评估，stVSSIM使用单尺度结构相似性指数（*SS-SSIM, single-scale structural similarity index*），因为SS-SSIM与人类对视觉质量的感知有很好地相关性。对于时间质量评估，stVSSIM将SS-SSIM扩展到时空域并将其称为SSIM-3D。与MOVIE中使用的光流（*optical flow*）相反，SSIM-3D使用基于块的运动估计算法将运动信息融合到stVSSIM中。此外，SSIM-3D还引入了一种避免块运动估计的方法，从而降低了计算复杂度。

SS-SSIM逐帧计算视频的空间质量，并且使用百分位方法计算帧的质量指标。对于包含低质量区域的图像质量而言，人类趋向于给出更差的评级。因此使用百分位[^34]方法将提高算法准确性。Percentile-SSIM或P-SSIM应用于每帧获得的分数。具体而言，帧质量度量方法如下：

$$
S_{frame}=\frac{1}{|\varphi|}\sum_{i \in \varphi}{SSIM(i)} \tag{式4-15}\label{式4-15}
$$

利用每一帧的得分的平均数来表示视频的空间得分，并用符号$$S_{video}$$表示。

利用视频的三维结构相似性（SSIM-3D）来评估时间质量，并对由运动信息（运动信息从运动矢量推导而出）计算而来的得分进行加权。在这种情况下，可以将视频看作一种三维信号。如果$$x$$和$$y$$分别代表参考视频和失真视频，那么该3维空间中的某个像素坐标$$(i,j,k)$$周围的空间可以用二维空间坐标$$(\alpha,\ \beta)$$和时间维度来表示，其中时间维度会包含$$\gamma$$个视频帧。$$(i,j)$$表示空间位置，$$k$$则表示对应的视频帧的序号。因此，SSIM-3D可以使用SSIM的3D扩展形式来表示，具体如下所示：

$$
SSIM_{3D}=\frac{(2\mu_{x(i,j,k)}\mu_{y(i,j,k)}+C_1)(2\sigma_{x(i,j,k)y(i,j,k)}+C_2)}{(\mu_{x(i,j,k)}^2+\mu_{y(i,j,k)}^2+C_1)(\sigma_{x(i,j,k)}^2+\sigma_{y(i,j,k)}^2+C_2)} \tag{式4-16}\label{式4-16}
$$

stVSSIM的本质是评估像素在各个方向上的时空质量，然后利用某个加权方案计算该像素的时空质量指数。加权因子取决于所使用的滤波器的类型。

为了考虑运动信息，需要使用块运动估计。运动估计在8×8的像素块上，使用ARPS算法（* Adaptive Rood Pattern Search*）在相邻帧之间计算运动矢量。一旦每个像素$$(i,j,k)$$的运动矢量可用，则对时空SSIM-3D分数进行加权。为了避免浮点数加权，需要执行贪心加权。像素$$(i,j,k)$$的时空分数是从四个滤波器产生的分数中筛选出来的（筛选的过程中会基于滤波器的类型），并且筛选出来的分数最近接像素$$(i,j,k)$$的运动方向。例如，如果像素的运动矢量是$$(u,v)=(0,2)$$，则该像素的时空分数将是由垂直滤波器产生的SSIM-3D值。如果运动矢量与两个滤波器平面等距，则时空分数是两个滤波器的SSIM-3D分数的平均值。在零运动的情况下，时空分数是所有四个SSIM-3D值的平均值。

视频的时间分数为帧级分数的平均值，并表示为$$T_{video}$$。视频的最终得分由$$S_{video}×T_{video}$$计算得出。

[^32]: Efficient Motion Weighted Spatio-Temporal Video SSIM Index.

[^33]: Motion-based Perceptual Quality Assessment of Video.

[^34]: [percentile，百分位数](https://baike.baidu.com/item/百分位数/10064171)，统计学术语，如果将一组数据从小到大排序，并计算相应的累计百分位，则某一百分位所对应数据的值就称为这一百分位的百分位数。可表示为：一组n个观测值按数值大小排列。如，处于p%位置的值称第p百分位数。

