# Fast Intra Prediction
H.264以及更新的标准中，除了变换之外，还利用帧内预测来减少空间冗余。然而，帧内编码处理存在很多数据依赖并且是计算密集型的编码方法，这限制了整体的编码速度。帧内编码的特性不仅导致很高的计算复杂度，而且还会导致很大的延迟（特别是对于实时视频应用而言）。为了解决这些问题，基于DCT属性和空间活动分析，Elarabi和Bayoumi[^1]提出了一种高吞吐量、快速、精确的帧内模式选择算法和方向预测算法，该算法降低了计算复杂性和处理所需的时间。与标准AVC相比，该算法把帧内预测运行时间优化了56%。与其他快速帧内预测技术相比，帧内预测运行时间优化了35％~39％。同时，该算法的PSNR比JM 18.2算法优化了1.8%，比其他快速帧内预测算法优化了18％~22％。在另一个实验中，和标准算法相比，Alam等人[^2]使用Z字形模式计算4×4的DC预测同时优化了PSNR（最高优化1.2dB）和运行时间（最高优化25%）。

[^1]: T. Elarabi and M. Bayoumi, “Full-search-free Intra Prediction Algorithm for Real-Time H.264/ AVC Decoder. 

[^2]: T. Alam, J. Ikbal, and T. Alam, “Fast DC Mode Prediction Scheme for Intra 4x4 Block in H.264/AVC Video Coding Standard.