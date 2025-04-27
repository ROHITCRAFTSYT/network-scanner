# Network Scanner

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
![Version](https://img.shields.io/badge/version-1.0.0-orange)
![Platform](https://img.shields.io/badge/platform-browser-lightgrey)

</div>

## 📋 Overview

A lightweight, browser-based tool for scanning local networks to identify devices, open ports, protocols, and potential security vulnerabilities. Perfect for network administrators and security professionals who need a quick and effective way to monitor network security.

## ✨ Features

- **📱 Device Discovery** - Automatically detects and identifies all devices on your local network
- **🔍 Port Scanning** - Identifies open ports and maps them to common services
- **🛡️ Vulnerability Detection** - Discovers potential security issues and configuration weaknesses
- **📊 Real-time Visualization** - Provides immediate visual feedback during scanning operations
- **⚙️ Customizable Scans** - Configure IP ranges, port ranges, and scan depth according to your needs

## 🚀 Quick Start

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/rohitcraftsyt/network-scanner.git

# Navigate to project directory
cd network-scanner

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm start
# or
yarn start
```

### Usage

1. Open the application in your browser (default: `http://localhost:3000`)
2. Configure scan settings in the left panel:
   - Select scan type (Quick/Deep)
   - Set IP range (e.g., 192.168.1.1-254)
   - Define port range (e.g., 1-1024)
3. Click "Start Scan" to begin discovering devices
4. Select any discovered device to view detailed information
5. Check the "Potential Vulnerabilities" section for security concerns

## 🖥️ Technology Stack

- **Frontend**: React.js with Hooks
- **UI Components**: Custom components with Tailwind CSS
- **Icons**: Lucide React
- **Network Simulation**: JavaScript-based network scanning simulation

## 🔒 Security Considerations

This tool is intended for legitimate network administrators to analyze their own networks. Always ensure you have proper authorization before scanning any network. Unauthorized network scanning may violate:

- Computer Fraud and Abuse Act (US)
- Computer Misuse Act (UK)
- Similar legislation in other jurisdictions

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
