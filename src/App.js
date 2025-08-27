import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [ip, setIp] = useState("");
  const [proxies, setProxies] = useState([]);
  const [selectedProxy, setSelectedProxy] = useState("");

  // Fetch current IP
  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then(res => res.json())
      .then(data => setIp(data.ip))
      .catch(err => console.log(err));
  }, []);

  // Fetch proxy list
  const fetchProxies = () => {
    fetch("https://api.proxyscrape.com/v2/?request=displayproxies&protocol=http&timeout=1000&country=all&ssl=all&anonymity=all")
      .then(res => res.text())
      .then(data => {
        const proxyArray = data.split("\n").filter(Boolean);
        setProxies(proxyArray);
      })
      .catch(err => console.log(err));
  };

  // Simulate switching proxy
  const handleProxyChange = (e) => {
    setSelectedProxy(e.target.value);
    // Here we "simulate" new IP by appending proxy
    setIp("Masked IP via Proxy: " + e.target.value);
  };

  return (
    <div className="App">
      <h1>VPN Extension (Educational)</h1>
      <p><b>Current IP:</b> {ip}</p>

      <button onClick={fetchProxies}>Fetch Proxy List</button>

      {proxies.length > 0 && (
        <div>
          <select onChange={handleProxyChange}>
            <option>Select a Proxy</option>
            {proxies.slice(0, 10).map((proxy, index) => (
              <option key={index} value={proxy}>{proxy}</option>
            ))}
          </select>
          <p><b>Selected Proxy:</b> {selectedProxy}</p>
        </div>
      )}
    </div>
  );
}

export default App;
