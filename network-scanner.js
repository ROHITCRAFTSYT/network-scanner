import React, { useState, useEffect } from 'react';
import { Network, Scan, ShieldAlert, Wifi, Activity, Server, Smartphone, Laptop, Globe, Printer, Database } from 'lucide-react';

export default function NetworkScanner() {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [devices, setDevices] = useState([]);
  const [scanType, setScanType] = useState('quick');
  const [ipRange, setIpRange] = useState('192.168.1.1-254');
  const [portRange, setPortRange] = useState('1-1024');
  const [vulnerabilities, setVulnerabilities] = useState({});
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [scanLog, setScanLog] = useState([]);

  const addLogMessage = (message) => {
    setScanLog(prev => [...prev, { time: new Date().toLocaleTimeString(), message }]);
  };

  const deviceTypes = {
    router: { icon: <Wifi size={20} />, name: 'Router/Gateway' },
    server: { icon: <Server size={20} />, name: 'Server' },
    mobile: { icon: <Smartphone size={20} />, name: 'Mobile Device' },
    computer: { icon: <Laptop size={20} />, name: 'Computer' },
    iot: { icon: <Globe size={20} />, name: 'IoT Device' },
    printer: { icon: <Printer size={20} />, name: 'Printer' },
    nas: { icon: <Database size={20} />, name: 'NAS' },
  };

  const commonVulnerabilities = {
    'Default Credentials': 'Device may be using default login credentials',
    'Open Telnet': 'Telnet service is enabled and accessible',
    'SMB v1': 'Outdated SMB protocol version detected',
    'Open SNMP': 'SNMP service with default community strings',
    'HTTP Without TLS': 'Web server without encryption',
    'Outdated Firmware': 'Device may be running outdated firmware',
    'UPnP Enabled': 'Universal Plug and Play is enabled and could be exploited',
  };

  const commonPorts = {
    21: { service: 'FTP', description: 'File Transfer Protocol' },
    22: { service: 'SSH', description: 'Secure Shell' },
    23: { service: 'Telnet', description: 'Remote Login Service (Insecure)' },
    25: { service: 'SMTP', description: 'Simple Mail Transfer Protocol' },
    80: { service: 'HTTP', description: 'Web Server (Unencrypted)' },
    443: { service: 'HTTPS', description: 'Web Server (Encrypted)' },
    445: { service: 'SMB', description: 'Server Message Block' },
    3389: { service: 'RDP', description: 'Remote Desktop Protocol' },
    8080: { service: 'HTTP Alt', description: 'Alternative HTTP Port' },
  };

  const startScan = () => {
    if (scanning) return;
    
    setScanning(true);
    setProgress(0);
    setDevices([]);
    setVulnerabilities({});
    setScanLog([]);
    addLogMessage('Starting network scan...');
    
    const ipParts = ipRange.split('-');
    const baseIp = ipParts[0].substring(0, ipParts[0].lastIndexOf('.') + 1);
    const startIp = parseInt(ipParts[0].substring(ipParts[0].lastIndexOf('.') + 1));
    const endIp = parseInt(ipParts[1]);
    const totalIps = endIp - startIp + 1;
    
    // Simulate scanning
    let foundDevices = [];
    let currentIp = startIp;
    
    const scanInterval = setInterval(() => {
      if (currentIp > endIp) {
        clearInterval(scanInterval);
        setScanning(false);
        setProgress(100);
        setDevices(foundDevices);
        addLogMessage(`Scan completed. Found ${foundDevices.length} devices.`);
        return;
      }
      
      const ip = baseIp + currentIp;
      const progressPercent = Math.floor(((currentIp - startIp + 1) / totalIps) * 100);
      setProgress(progressPercent);
      addLogMessage(`Scanning IP: ${ip}`);
      
      // Simulate finding a device (randomly)
      if (Math.random() > 0.7) {
        const deviceTypeKeys = Object.keys(deviceTypes);
        const deviceType = deviceTypeKeys[Math.floor(Math.random() * deviceTypeKeys.length)];
        const macAddress = generateRandomMac();
        const hostname = generateHostname(deviceType);
        
        const device = {
          id: foundDevices.length + 1,
          ip,
          mac: macAddress,
          hostname,
          type: deviceType,
          openPorts: generateOpenPorts(),
          lastSeen: new Date().toLocaleString(),
        };
        
        foundDevices.push(device);
        setDevices([...foundDevices]);
        addLogMessage(`Found device: ${hostname} (${ip})`);
        
        // Generate vulnerabilities for some devices
        if (Math.random() > 0.6) {
          const deviceVulns = generateVulnerabilities();
          setVulnerabilities(prev => ({
            ...prev,
            [device.id]: deviceVulns
          }));
          
          if (deviceVulns.length > 0) {
            addLogMessage(`Potential vulnerabilities found on ${hostname}`);
          }
        }
      }
      
      currentIp++;
    }, scanType === 'quick' ? 100 : 200);
  };

  const generateRandomMac = () => {
    const hexDigits = "0123456789ABCDEF";
    let mac = "";
    for (let i = 0; i < 6; i++) {
      mac += hexDigits.charAt(Math.floor(Math.random() * 16));
      mac += hexDigits.charAt(Math.floor(Math.random() * 16));
      if (i < 5) mac += ":";
    }
    return mac;
  };

  const generateHostname = (type) => {
    const prefixes = {
      router: ["Router", "Gateway", "AP"],
      server: ["Server", "NAS", "Cloud"],
      mobile: ["iPhone", "Android", "Mobile"],
      computer: ["PC", "MacBook", "Desktop"],
      iot: ["SmartTV", "Echo", "Nest"],
      printer: ["Printer", "Scanner", "MFP"],
      nas: ["NAS", "Storage", "Backup"]
    };
    
    const prefix = prefixes[type][Math.floor(Math.random() * prefixes[type].length)];
    const suffix = Math.floor(Math.random() * 1000);
    return `${prefix}-${suffix}`;
  };

  const generateOpenPorts = () => {
    const ports = [];
    const allPorts = Object.keys(commonPorts).map(Number);
    
    // Randomly select some ports to be open
    const numOpenPorts = Math.floor(Math.random() * 5) + 1;
    for (let i = 0; i < numOpenPorts; i++) {
      const randomPortIndex = Math.floor(Math.random() * allPorts.length);
      const port = allPorts[randomPortIndex];
      if (!ports.includes(port)) {
        ports.push(port);
      }
    }
    
    return ports.sort((a, b) => a - b);
  };

  const generateVulnerabilities = () => {
    const vulns = [];
    const allVulns = Object.keys(commonVulnerabilities);
    
    // Randomly select some vulnerabilities
    const numVulns = Math.floor(Math.random() * 3);
    for (let i = 0; i < numVulns; i++) {
      const randomVulnIndex = Math.floor(Math.random() * allVulns.length);
      const vuln = allVulns[randomVulnIndex];
      if (!vulns.includes(vuln)) {
        vulns.push(vuln);
      }
    }
    
    return vulns;
  };

  const getDeviceDetails = (device) => {
    setSelectedDevice(device);
  };

  const getSeverityClass = (vulnCount) => {
    if (vulnCount === 0) return "bg-green-100 text-green-800";
    if (vulnCount === 1) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white p-4 shadow-md">
        <div className="flex items-center space-x-2">
          <Network size={24} />
          <h1 className="text-xl font-bold">Network Scanner</h1>
        </div>
        <p className="text-sm opacity-80">Discover devices and vulnerabilities on your local network</p>
      </div>
      
      <div className="flex flex-grow overflow-hidden">
        {/* Left Panel: Controls and Settings */}
        <div className="w-64 bg-gray-100 p-4 flex flex-col">
          <div className="mb-4">
            <h2 className="text-lg font-semibold flex items-center mb-2">
              <Scan size={18} className="mr-2" />
              Scan Settings
            </h2>
            
            <label className="block mb-2 text-sm font-medium">Scan Type</label>
            <select 
              className="w-full p-2 border rounded"
              value={scanType}
              onChange={(e) => setScanType(e.target.value)}
              disabled={scanning}
            >
              <option value="quick">Quick Scan</option>
              <option value="deep">Deep Scan</option>
            </select>
            
            <label className="block mt-3 mb-2 text-sm font-medium">IP Range</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded"
              value={ipRange}
              onChange={(e) => setIpRange(e.target.value)}
              disabled={scanning}
              placeholder="192.168.1.1-254"
            />
            
            <label className="block mt-3 mb-2 text-sm font-medium">Port Range</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded"
              value={portRange}
              onChange={(e) => setPortRange(e.target.value)}
              disabled={scanning}
              placeholder="1-1024"
            />
          </div>
          
          <button
            className={`w-full py-2 rounded font-medium ${
              scanning ? 'bg-gray-300 text-gray-700' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            onClick={startScan}
            disabled={scanning}
          >
            {scanning ? 'Scanning...' : 'Start Scan'}
          </button>
          
          {scanning && (
            <div className="mt-4">
              <div className="h-2 bg-gray-200 rounded overflow-hidden">
                <div 
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-center mt-1">{progress}% complete</p>
            </div>
          )}
          
          <div className="mt-4 flex-grow overflow-auto">
            <h3 className="text-md font-semibold flex items-center mb-2">
              <Activity size={16} className="mr-2" />
              Scan Log
            </h3>
            <div className="bg-black bg-opacity-80 text-green-400 p-2 rounded text-xs font-mono h-64 overflow-y-auto">
              {scanLog.map((log, index) => (
                <div key={index} className="mb-1">
                  <span className="opacity-60">[{log.time}]</span> {log.message}
                </div>
              ))}
              {scanLog.length === 0 && (
                <div className="opacity-50 italic">No scan activity</div>
              )}
            </div>
          </div>
        </div>
        
        {/* Middle Panel: Device List */}
        <div className="flex-grow p-4 overflow-auto border-l border-r border-gray-200">
          <h2 className="text-lg font-semibold mb-3">Discovered Devices ({devices.length})</h2>
          
          {devices.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No devices found. Start a scan to discover network devices.
            </div>
          ) : (
            <div className="grid gap-3">
              {devices.map(device => {
                const deviceVulns = vulnerabilities[device.id] || [];
                return (
                  <div 
                    key={device.id}
                    className={`border rounded p-3 cursor-pointer hover:bg-gray-50 ${
                      selectedDevice?.id === device.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => getDeviceDetails(device)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          {deviceTypes[device.type].icon}
                        </div>
                        <div>
                          <h3 className="font-medium">{device.hostname}</h3>
                          <p className="text-sm text-gray-600">{device.ip}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`text-xs px-2 py-1 rounded-full ${getSeverityClass(deviceVulns.length)}`}>
                          {deviceVulns.length} {deviceVulns.length === 1 ? 'issue' : 'issues'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Right Panel: Device Details */}
        <div className="w-96 bg-gray-50 p-4 overflow-auto">
          {selectedDevice ? (
            <div>
              <h2 className="text-lg font-semibold mb-3">Device Details</h2>
              
              <div className="bg-white border rounded p-4 mb-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    {deviceTypes[selectedDevice.type].icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{selectedDevice.hostname}</h3>
                    <p className="text-gray-600">{deviceTypes[selectedDevice.type].name}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">IP Address:</div>
                  <div>{selectedDevice.ip}</div>
                  
                  <div className="font-medium">MAC Address:</div>
                  <div>{selectedDevice.mac}</div>
                  
                  <div className="font-medium">Last Seen:</div>
                  <div>{selectedDevice.lastSeen}</div>
                </div>
              </div>
              
              {/* Open Ports */}
              <h3 className="font-semibold mb-2 flex items-center">
                <Globe size={16} className="mr-1" />
                Open Ports
              </h3>
              
              <div className="bg-white border rounded mb-4">
                {selectedDevice.openPorts.length > 0 ? (
                  <div className="divide-y">
                    {selectedDevice.openPorts.map(port => (
                      <div key={port} className="p-3">
                        <div className="flex justify-between">
                          <div className="font-medium">{port}</div>
                          <div>{commonPorts[port]?.service || 'Unknown'}</div>
                        </div>
                        <div className="text-xs text-gray-600">
                          {commonPorts[port]?.description || 'Unknown service'}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 text-center text-gray-500">No open ports detected</div>
                )}
              </div>
              
              {/* Vulnerabilities */}
              <h3 className="font-semibold mb-2 flex items-center">
                <ShieldAlert size={16} className="mr-1" />
                Potential Vulnerabilities
              </h3>
              
              <div className="bg-white border rounded">
                {(vulnerabilities[selectedDevice.id]?.length > 0) ? (
                  <div className="divide-y">
                    {vulnerabilities[selectedDevice.id].map((vuln, index) => (
                      <div key={index} className="p-3">
                        <div className="font-medium text-red-600">{vuln}</div>
                        <div className="text-xs text-gray-600">
                          {commonVulnerabilities[vuln]}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 text-center text-green-600">No vulnerabilities detected</div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a device to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}