import type { MediaSample, ProcessingModule, RecentScan, ProblemFeature, TimelineStep, TechArchitecture, AccuracyBenchmark } from '../types';

export const SAMPLE_MEDIA: MediaSample[] = [
  {
    id: 'sample-user-webcam',
    title: 'Real Human: Webcam Portrait (Authentic)',
    filename: 'user_camera_portrait.jpg',
    type: 'image',
    result: 'REAL HUMAN (AUTHENTIC)',
    confidence: 99.6,
    riskLevel: 'LOW',
    description: 'Verified real human face. Natural biological skin microtexture, authentic room lighting gradient, coherent corneal reflections, and genuine camera Bayer sensor noise.',
    previewUrl: '/user-webcam-portrait.jpg',
    signals: {
      facialSignal: 8,
      pixelSignal: 6,
      patternSignal: 7,
      temporalSignal: 5,
    },
    metrics: {
      facialConsistency: 99.4,
      pixelConsistency: 98.8,
      visualArtifacts: 1.2,
      frameConsistency: 99.5,
      frequencyAnomaly: 2.1,
      compressionNoise: 3.8,
    },
    detectedAnomalies: [
      'Genuine human epidermal microtexture & natural pore density verified (99.6% biological match)',
      'Corneal specular reflections match ambient room keylight angle precisely',
      'Zero AI generation or GAN autoencoder blending seams detected (p < 0.0001)',
      'Optical depth-of-field blur gradient conforms to physical camera lens physics'
    ],
    logs: [
      '[INIT] DeepGuard AI Forensic Core v4.8.2 initialized',
      '[INGEST] Ingested user webcam frame • Color space: sRGB • Format: JPEG',
      '[FACE] MTCNN localized 1 primary human facial ROI [detection confidence: 0.9999]',
      '[LANDMARK] 68-point anatomical facial landmark alignment verified • Jitter: 0.003px',
      '[BIOMETRIC] Subsurface epidermal light scattering consistent with living human tissue',
      '[CORNEA] Coherent corneal light highlights confirmed across both pupils',
      '[FREQ] 2D Discrete Cosine Transform (DCT) adheres to natural optical decay',
      '[SVM] Radial Basis Function (RBF) margin classified: REAL HUMAN (AUTHENTIC)',
      '[COMPLETE] Forensic verdict generated • Confirmed Real Human • Confidence: 99.6%'
    ]
  },
  {
    id: 'sample-user-deepfake',
    title: 'Deepfake: Your AI Face-Swap (Fake)',
    filename: 'user_faceswap_manipulated.jpg',
    type: 'image',
    result: 'DEEPFAKE (FAKE)',
    confidence: 99.8,
    riskLevel: 'HIGH',
    description: 'Deepfake face-swap manipulation detected. Facial replacement autoencoder detected with Poisson boundary blending seams, mismatched corneal reflection geometry, and facial landmark warping.',
    previewUrl: '/user-deepfake-portrait.jpg',
    signals: {
      facialSignal: 98,
      pixelSignal: 96,
      patternSignal: 99,
      temporalSignal: 94,
    },
    metrics: {
      facialConsistency: 18.4,
      pixelConsistency: 22.8,
      visualArtifacts: 98.2,
      frameConsistency: 19.0,
      frequencyAnomaly: 98.8,
      compressionNoise: 94.4,
    },
    detectedAnomalies: [
      'Facial boundary blending seam detected along jawline and cheek perimeter (p < 0.0001)',
      'Artificial face swap autoencoder latent feature mismatch (dim: 512, delta: +58.4%)',
      'Asymmetric pupil specular reflections inconsistent with room lighting (18.6° discrepancy)',
      'High-frequency DCT spectral spikes from neural generator up-sampling'
    ],
    logs: [
      '[INIT] DeepGuard AI Forensic Core v4.8.2 initialized',
      '[INGEST] Ingested 1024x576 user portrait frame • Format: JPEG',
      '[FACE] MTCNN localized 1 face ROI • Warning: Boundary delta = +58.4%',
      '[BLENDING] Irregular Poisson blending seam detected around facial oval',
      '[SPECTRAL] Discrete Cosine Transform (DCT) reveals neural lattice artifacts',
      '[CORNEA] Pupil specular ray-tracing mismatch: 18.6° angular discrepancy',
      '[CNN] EfficientNet-B4 classified deepfake autoencoder face-swap pattern',
      '[SVM] SVM hyper-plane distance: +5.14 (Far outside authentic human centroid)',
      '[ALERT] Deepfake face-swap manipulation confirmed • DEEPFAKE (FAKE) • Confidence: 99.8%'
    ]
  },
  {
    id: 'sample-authentic',
    title: 'Real Human: Executive Briefing (Authentic)',
    filename: 'executive_press_cam01.jpg',
    type: 'image',
    result: 'REAL HUMAN (AUTHENTIC)',
    confidence: 99.4,
    riskLevel: 'LOW',
    description: 'Verified real human face. Natural biological subsurface skin scattering, synchronous corneal specular reflections, and authentic optical camera sensor noise.',
    previewUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    signals: {
      facialSignal: 9,
      pixelSignal: 7,
      patternSignal: 8,
      temporalSignal: 6,
    },
    metrics: {
      facialConsistency: 99.2,
      pixelConsistency: 98.4,
      visualArtifacts: 1.5,
      frameConsistency: 99.1,
      frequencyAnomaly: 2.8,
      compressionNoise: 4.2,
    },
    detectedAnomalies: [
      'Genuine human skin microtexture & pore distribution verified (99.4% anatomical match)',
      'Continuous bilateral facial landmark micro-movement confirmed (0.004px jitter)',
      'Consistent corneal reflection highlights from ambient natural lighting',
      'Natural frequency spectrum decay conforming to optical camera physics (1/f power law)'
    ],
    logs: [
      '[INIT] DeepGuard AI Forensic Core v4.8.2 initialized',
      '[INGEST] Ingested 1920x1080 frame • Color space: sRGB • Format: JPEG',
      '[FACE] MTCNN localized 1 primary facial bounding box [confidence: 0.9999]',
      '[LANDMARK] 68-point facial mesh alignment verified • Jitter variance: 0.004px',
      '[BIOMETRIC] Subsurface epidermal light scattering consistent with real human tissue',
      '[FREQ] 2D Discrete Cosine Transform (DCT) computed across 8x8 blocks',
      '[CNN] ResNet-50 visual feature embeddings extracted (dim: 2048)',
      '[SVM] Radial Basis Function (RBF) margin classified: REAL HUMAN (AUTHENTIC)',
      '[COMPLETE] Forensic verdict generated • Confirmed Real Human • Confidence: 99.4%'
    ]
  },
  {
    id: 'sample-faceswap',
    title: 'Deepfake: Synthetic Face-Swap (DeepFaceLab)',
    filename: 'interview_faceswap_manipulated.mp4',
    type: 'video',
    result: 'DEEPFAKE (FAKE)',
    confidence: 99.2,
    riskLevel: 'HIGH',
    description: 'Deepfake manipulation confirmed. Severe facial perimeter blending seams, unnatural jawline blurring, and mismatched pupil specular reflections reveal synthetic autoencoder face replacement.',
    previewUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    signals: {
      facialSignal: 97,
      pixelSignal: 95,
      patternSignal: 98,
      temporalSignal: 92,
    },
    metrics: {
      facialConsistency: 21.4,
      pixelConsistency: 25.1,
      visualArtifacts: 97.4,
      frameConsistency: 22.0,
      frequencyAnomaly: 98.2,
      compressionNoise: 91.5,
    },
    detectedAnomalies: [
      'Discontinuity in facial boundary blending mask (Poisson blending seam detected)',
      'Asymmetric corneal light reflection angles between left and right iris (15.2° mismatch)',
      'Anomalous high-frequency spectral spikes (GAN up-sampling artifact)',
      'Micro-flicker detected across consecutive temporal facial frames (p < 0.0001)'
    ],
    logs: [
      '[INIT] DeepGuard AI Forensic Core v4.8.2 initialized',
      '[INGEST] Processing temporal frame buffer • Resolution: 1080p • 60 FPS',
      '[FACE] Localized face region • Warning: Boundary sharpness delta = +52.8%',
      '[FREQ] FFT spectrum analysis revealed artificial periodic lattice noise',
      '[CORNEA] Iris specular ray-tracing mismatch: 15.2° angular discrepancy',
      '[CNN] EfficientNet-B4 detected synthetic blending artifacts in layer 7',
      '[SVM] SVM hyper-plane distance: +4.88 (Outside authentic human centroid)',
      '[ALERT] Deepfake autoencoder face-swap manipulation confirmed • DEEPFAKE (FAKE) • Confidence: 99.2%'
    ]
  },
  {
    id: 'sample-diffusion',
    title: 'Deepfake: Generative AI Identity (Diffusion/GAN)',
    filename: 'synthetic_portrait_generated.png',
    type: 'image',
    result: 'DEEPFAKE (FAKE)',
    confidence: 99.1,
    riskLevel: 'HIGH',
    description: 'Generative AI deepfake identity detected. Non-human dental morphology, asymmetric iris pupil boundaries, and typical latent diffusion noise signatures detected across high-frequency color planes.',
    previewUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    signals: {
      facialSignal: 95,
      pixelSignal: 98,
      patternSignal: 96,
      temporalSignal: 89,
    },
    metrics: {
      facialConsistency: 24.2,
      pixelConsistency: 18.5,
      visualArtifacts: 96.8,
      frameConsistency: 26.0,
      frequencyAnomaly: 97.4,
      compressionNoise: 96.2,
    },
    detectedAnomalies: [
      'Non-Euclidean iris perimeter geometry and synthetic pupil edge blurring',
      'Uncharacteristic pixel correlation in background bokeh noise',
      'Absence of natural micro-vascular skin blood flow pulsation (rPPG)',
      'Latent diffusion generator fingerprint detected in chroma channel U/V residuals (p < 0.0001)'
    ],
    logs: [
      '[INIT] DeepGuard AI Forensic Core v4.8.2 initialized',
      '[INGEST] Ingested lossless PNG • Resolution: 1024x1024',
      '[CHROMINANCE] Inverted residual check on Cr/Cb planes indicates AI synthesis',
      '[BIOMETRIC] Remote Photoplethysmography (rPPG) extraction: No biological pulse detected',
      '[IRIS] Landmark biometric triangulation failed: Non-standard iris curvature',
      '[ENSEMBLE] Multi-layer feature voting confirms synthetic origin (5/5 consensus)',
      '[ALERT] AI Generated Synthetic Media • DEEPFAKE (FAKE) • Confidence: 99.1%'
    ]
  }
];

export const PROCESSING_MODULES: ProcessingModule[] = [
  { id: 'face', label: 'Face Localization', subtext: 'MTCNN & Haar Cascade mapping', durationMs: 400 },
  { id: 'features', label: 'Feature Extraction', subtext: 'ResNet-50 / EfficientNet embeddings', durationMs: 500 },
  { id: 'pixel', label: 'Pixel & Frequency Analysis', subtext: 'DCT / FFT spectral anomaly checks', durationMs: 450 },
  { id: 'pattern', label: 'Pattern & Artifact Detection', subtext: 'Blending boundaries & iris reflections', durationMs: 450 },
  { id: 'classification', label: 'Ensemble Classification', subtext: 'SVM hyperplane & probabilistic score', durationMs: 400 }
];

export const PROBLEM_FEATURES: ProblemFeature[] = [
  {
    number: '01',
    title: 'Synthetic Media Is Growing',
    description: 'AI-generated images and hyper-realistic deepfake videos are multiplying exponentially across digital platforms, evading standard moderation filters and human eyes.',
    tag: 'Exponential Threat'
  },
  {
    number: '02',
    title: "Manual Verification Doesn't Scale",
    description: 'Human inspection is painstakingly slow, subjective, and prone to fatigue when millions of digital assets and video frames must be verified every second.',
    tag: 'Operational Bottleneck'
  },
  {
    number: '03',
    title: 'Trust Is Becoming Digital',
    description: 'Enterprises, newsrooms, judicial institutions, and government bodies urgently require automated, explainable media forensics to safeguard public trust.',
    tag: 'Institutional Integrity'
  },
  {
    number: '04',
    title: 'Manipulation Leaves Signals',
    description: 'No matter how convincing the render, AI generative pipelines leave microscopic frequency artifacts, biometric inconsistencies, and pixel-level residual signatures.',
    tag: 'Forensic Exploitation'
  }
];

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    step: '01',
    title: 'Upload Media',
    description: 'User uploads an image or video asset via drag-and-drop or encrypted API stream.',
    details: 'Supports high-resolution JPEG, PNG, MP4, MOV. Performs cryptographic SHA-256 integrity hash.',
    tag: 'Ingestion'
  },
  {
    step: '02',
    title: 'Preprocess & Frame Extraction',
    description: 'Resize, normalize color channels, and extract temporal keyframes for granular analysis.',
    details: 'Normalizes colorspace to linear sRGB, decomposes video into 60fps frame buffers, isolates facial ROIs.',
    tag: 'Normalization'
  },
  {
    step: '03',
    title: 'Extract Multi-Domain Features',
    description: 'Analyze 68-point facial landmarks, corneal specular reflections, and frequency spectra.',
    details: 'Computes 2D Discrete Cosine Transforms (DCT), FFT noise prints, and deep convolutional embeddings.',
    tag: 'Feature Extraction'
  },
  {
    step: '04',
    title: 'AI Detection & Ensemble Inference',
    description: 'Apply high-dimensional machine learning and deep learning models for classification.',
    details: 'Ensemble of fine-tuned CNN backbones coupled with Support Vector Machines (SVM) with RBF kernels.',
    tag: 'Inference'
  },
  {
    step: '05',
    title: 'Forensic Detection Report',
    description: 'Present the classification, confidence metrics, and explainable anomaly heatmap.',
    details: 'Generates tamper heatmaps, anomaly radar charts, exportable PDF audit logs, and compliance records.',
    tag: 'Forensic Output'
  }
];

export const TECH_ARCHITECTURES: TechArchitecture[] = [
  {
    id: 'cnn',
    title: 'Convolutional Neural Networks (CNN)',
    badge: 'Deep Visual Representations',
    description: 'Extracts hierarchical visual features from raw pixel matrices, identifying micro-textures, blending edges, and unnatural smoothing artifacts across layered receptive fields.',
    highlights: [
      'Multi-scale receptive field feature maps',
      'Trained on diverse face-swap and diffusion benchmarks',
      'ResNet-50 & EfficientNet backbones with attention pooling',
      'Spatial artifact sensitivity down to sub-pixel resolution'
    ]
  },
  {
    id: 'svm',
    title: 'Support Vector Machines (SVM)',
    badge: 'High-Dimensional Separation',
    description: 'Classifies high-dimensional feature vectors into authentic or manipulated hyperplanes using nonlinear Radial Basis Function (RBF) kernels with maximized decision margins.',
    highlights: [
      'Robust generalization to unseen deepfake generator architectures',
      'Extreme resistance to adversarial noise and over-fitting',
      'RBF kernel projection separating subtle synthetic anomalies',
      'Fast sub-millisecond inference time on edge hardware'
    ]
  },
  {
    id: 'features',
    title: 'Multi-Modal Feature Extraction',
    badge: 'Forensic Biometrics & Physics',
    description: 'Combines biological signal verification (rPPG pulse detection, pupil reflection coherence) with mathematical frequency transforms (DCT/FFT) to spot generative artifacts.',
    highlights: [
      'Frequency domain Discrete Cosine Transform (DCT) noise profiling',
      '68-point facial landmark geometric rigidity analysis',
      'Biological blood flow micro-pulsation (remote PPG) estimation',
      'Specular reflection ray-tracing across dual corneas'
    ]
  }
];

export const RECENT_SCANS: RecentScan[] = [
  {
    id: 'SCN-8921',
    filename: 'press_briefing_feed_09.mp4',
    fileType: 'MP4 Video',
    timestamp: '2 mins ago',
    result: 'REAL HUMAN (AUTHENTIC)',
    confidence: 99.4,
    riskLevel: 'LOW',
    flags: ['Natural Noise Pattern', 'Corneal Coherence Verified'],
    fileSize: '14.2 MB'
  },
  {
    id: 'SCN-8920',
    filename: 'candidate_speech_clip.mp4',
    fileType: 'MP4 Video',
    timestamp: '7 mins ago',
    result: 'DEEPFAKE (FAKE)',
    confidence: 99.7,
    riskLevel: 'HIGH',
    flags: ['Lip Sync Desync (140ms)', 'Poisson Blending Seams', 'Periodic Lattice'],
    fileSize: '8.4 MB'
  },
  {
    id: 'SCN-8919',
    filename: 'executive_id_portrait.png',
    fileType: 'PNG Image',
    timestamp: '19 mins ago',
    result: 'DEEPFAKE (FAKE)',
    confidence: 99.2,
    riskLevel: 'HIGH',
    flags: ['Diffusion Noise Signature', 'Asymmetric Pupils', 'Bokeh Anomaly'],
    fileSize: '2.8 MB'
  },
  {
    id: 'SCN-8918',
    filename: 'courtroom_exhibit_b.jpg',
    fileType: 'JPG Image',
    timestamp: '34 mins ago',
    result: 'REAL HUMAN (AUTHENTIC)',
    confidence: 99.6,
    riskLevel: 'LOW',
    flags: ['CFA Bayer Matrix Intact', 'EXIF Metadata Consistent'],
    fileSize: '4.1 MB'
  },
  {
    id: 'SCN-8917',
    filename: 'broadcast_news_anchor.mov',
    fileType: 'MOV Video',
    timestamp: '1 hour ago',
    result: 'REVIEW REQUIRED',
    confidence: 97.4,
    riskLevel: 'MEDIUM',
    flags: ['Heavy H.264 Re-compression', 'Sub-threshold Frequency Jitter'],
    fileSize: '42.0 MB'
  },
  {
    id: 'SCN-8916',
    filename: 'passport_kyc_verification.jpg',
    fileType: 'JPG Image',
    timestamp: '2 hours ago',
    result: 'REAL HUMAN (AUTHENTIC)',
    confidence: 99.8,
    riskLevel: 'LOW',
    flags: ['Hologram Authenticity Verified', 'Skin Microtexture Valid'],
    fileSize: '1.9 MB'
  }
];

export const ACCURACY_BENCHMARKS: AccuracyBenchmark[] = [
  {
    benchmarkName: 'NIST FRVT 1:1 Verification',
    category: 'Facial Biometric Authenticity',
    deepguardAccuracy: 99.94,
    industryAverage: 94.20,
    datasetSize: '1.4M images',
    metric: 'True Accept Rate @ 10^-5 FAR',
    certifiedBy: 'National Institute of Standards and Technology'
  },
  {
    benchmarkName: 'FaceForensics++ (c23 HQ)',
    category: 'Autoencoder & Blending Face-Swaps',
    deepguardAccuracy: 99.81,
    industryAverage: 92.50,
    datasetSize: '1,000 video sequences (500k frames)',
    metric: 'Area Under ROC (AUC)',
    certifiedBy: 'Technical University of Munich (TUM)'
  },
  {
    benchmarkName: 'DFDC (Deepfake Detection Challenge)',
    category: 'In-The-Wild Generative Manipulations',
    deepguardAccuracy: 99.45,
    industryAverage: 88.90,
    datasetSize: '124,000 video assets',
    metric: 'Log-Loss Precision',
    certifiedBy: 'Meta AI / AWS / Partnership on AI'
  },
  {
    benchmarkName: 'Celeb-DF v2 Benchmark',
    category: 'High-Quality Deepfake Synthesis',
    deepguardAccuracy: 99.68,
    industryAverage: 90.10,
    datasetSize: '5,639 high-res video assets',
    metric: 'Binary Classification Accuracy',
    certifiedBy: 'SUNY Albany CV Lab'
  },
  {
    benchmarkName: 'WildDeepfake Benchmark',
    category: 'Cross-Generator Real-World Web Media',
    deepguardAccuracy: 99.12,
    industryAverage: 84.60,
    datasetSize: '7,314 internet video sequences',
    metric: 'Cross-Domain Generalization',
    certifiedBy: 'IEEE CVPR Benchmark'
  }
];

export const SYSTEM_ACCURACY_SUMMARY = {
  certifiedAccuracy: 99.94,
  falseAcceptanceRate: '< 0.0008%',
  falseRejectionRate: '< 0.0012%',
  areaUnderRoc: 0.9992,
  inferenceLatency: '12ms',
  modelsInConsensus: '5/5 Neural Ensembles (100% Concordance)',
  fipsStandard: 'FIPS 140-3 Cryptographic Integrity',
};

