# 人类视觉系统
人类视觉系统（*HVS，human visual system*）是由大脑管理的、人类神经系统的一部分。神经系统和大脑通过大约1000亿个神经细胞进行电化学通讯，这些神经细胞称为神经元[^1]。神经元会产生脉冲或抑制现有脉冲，从而产生多种现象：从马赫带（*Mach bands*）[^2]，到视觉频率响应的带通特性，再到眼睛的边缘检测机制。研究及其复杂的神经系统并不是一件难事，因为神经系统中只有两种信号：一种是长距离（*long distances*）信号，另一种是短距离（*short distances*）信号。无论这些信号所携带的信息是视觉信息、还是听觉信息、亦或是其他信息，对于神经元而言，这些信号都是相同的。

了解HVS的工作方式非常重要，因为：

* 了解HVS可以解释用户对其观看的内容的准确度的感知。
* 了解HVS有助于从诸如亮度（*luminance*）和空间频率（*spatial frequencies*））的视觉信号的物理量角度了解视觉信号的构成，还有助于制定信号保真度的度量。
* 了解HVS有助于通过各种属性来表示感知到的信息——例如明度（*brightness*），颜色，对比度，运动，边缘和形状等。并且还有助于确定HVS对这些属性的敏感性。
* 了解HVS有助于利用HVS的明显缺陷给用户以最真实的视觉感知。一个比较好的例子是彩色电视：HVS对颜色信息的丢失较不敏感，因此通过色度亚采样减小彩色电视的传输带宽则变得较为容易。

HVS的主要组成部分包括：眼睛，通向大脑的视觉通道，称为视觉皮层（*visual cortex*）的部分大脑。眼睛捕获光并将其转换为神经系统可以理解的信号，然后这些信号沿着视觉通道传输并处理。

因此，眼睛是视觉信号的传感器。眼睛是一个光学系统，外界的图像投射到位于眼睛后部的视网膜（*retina*）上。进入视网膜的光透过多层神经元，最后对光线敏感的感光器（*light\-sensitive photoreceptors*）。感光器是可以将入射光能转换为神经信号的特殊神经元。

视网膜有两种类型的感光器：视杆细胞（*rods*）和视锥细胞（*cones*）。视杆细胞在低光度（暗视觉）下也较为敏感，但是无法区分光的颜色，仅能感知光的亮度，并且多分布在中央凹（*foveal*）[^3]的边缘。视杆细胞还负责周边视觉（*peripheral vision*）[^4]，并有助于运动检测和形状检测。来自多个视杆细胞的信号会聚到单个神经元，从而使得周边视觉的灵敏度很高，但周边视觉的分辨率却很低。另一方面，视锥细胞具有色彩感知功能，其在强光（明视觉）下最为敏感，并且具有带通响应特性。视锥细胞分为三种类型，分别对长波（L），中波（M）和短波（S）比较敏感。视锥细胞构成颜色感知的基础。视锥细胞大多集中在视网膜的中央区域，该区域也称为中央凹。视锥细胞负责中央视觉，并且在黑暗中相对较弱。来自每个视锥细胞的信号会经过多个神经元的编码，从而导致其具备较高的分辨率，但是其灵敏度较低。

视网膜上大约有650万个视锥细胞，1亿个视杆细胞，视杆细胞的的数量比视锥细胞高出一个数量级。这使得HVS对运动信息和结构信息更为敏感，而对颜色信息的丢失则不敏感。另外，HVS的运动敏感性要高于纹理敏感性。例如，与运动的动物相比，HVS对于伪装不动的动物会更难以感知。最后，HVS的纹理敏感性高于视差（*disparity*）[^5]敏感性。例如，不需要太精确的分辨率就可以感知3D深度[^6]。

视觉信号通过视神经从视网膜传递到大脑的各个处理中心，因此即使视网膜可以完美地检测到光，这种检测能力也可能无法得到充分利用，或者不为大脑所感知。视觉皮层位于枕叶的距状裂周围，负责高级视觉的相关处理。

除了初级视觉皮层（占HVS的最大部分）外，视觉信号还会达到其他的大约20个皮层区域，但目前对这20多个其他皮层的功能的了解并不多。视觉皮层中的不同细胞具有不同的专长，并且它们对不同的刺激（例如特定的颜色，图案的方向，频率，速度等）具有不同的敏感性。

初级视觉皮层的简单细胞以可预测的方式响应特定的空间频率，方向和相位，并用作定向带通滤波器。复杂细胞是初级视觉皮层中最常见的细胞，也具有方向选择性。与简单细胞不同，复杂细胞可以在其感受范围中的任何位置对正确定向的刺激做出反应。某些复杂细胞是方向选择的，而某些细胞则对大小，角落，曲率或线条的突然中断敏感。

HVS能够适应大范围的光强度或亮度，从而使我们能够区分任何光线水平下相对于周围亮度的亮度变化。物体的实际亮度不依赖于其周围物体的亮度。但是，所感知的物体的亮度却会受到周围环境亮度的影响。因此，具有相同亮度的两个对象在不同的环境中可能具有不同的感知亮度。对比度用来度量这种相对亮度变化。等量的亮度对数的增量被视为等量的对比度的变化。HVS可以检测到1％的对比度变化。

[^1]: [神经元概述](https://new.qq.com/omn/20190607/20190607A008OK.html)

[^2]: 马赫带指人们在明暗变化的边界，常常在亮区看到一条更亮的光带，而在暗区看到一条更暗的线条。这就是马赫带现象，马赫带不是由于刺激能量的分布，而是由于神经网络对视觉信息进行加工的结果。

[^3]: 视网膜中感光器密度最大的部分称之为中央凹。

[^4]: 人有两种视觉，中央视觉和周边视觉。中央视觉用来直视事物观察细节，而周边视觉则展现视野中的其他区域，也就是人眼能看到的周边区域。人可以用眼睛的余光观察事物，人对场景的认知来自周边视觉。有驾车经验的小伙伴应该会有这样的感受，在开车的时候眼睛是看着行驶方向的远处，这里的远处其实是中央视觉，对前方的路况会观察的比较仔细，而周边的环境在视野中其实是模糊的，我们的眼睛是时刻在采集道路信息的，只要周边环境有异动或危险情况，我们就会通过眼睛把路况传递给大脑，大脑就会指挥脑袋转向有特殊路况的方向，同时眼睛的注意力也会移动到特殊路况上。整个过程其实是周边视觉转变成中央视觉的一个过程。人对场景的认知来自周边视觉，周边视觉决定中央视觉观察的位置。

[^5]: 双目立体视觉融合两只眼睛获得的图像并观察它们之间的差别，使我们可以获得明显的深度感，建立特征间的对应关系，将同一空间物理点在不同图像中的映像点对应起来，这个差别，我们称作视差(Disparity)图像。

[^6]: 那么提到视差图，就有深度图，深度图像也叫距离影像，是指将从图像采集器到场景中各点的距离（深度）值作为像素值的图像。获取方法有：激光雷达深度成像法、计算机立体视觉成像、坐标测量机法、莫尔条纹法、结构光法。