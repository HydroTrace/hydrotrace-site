import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface CountryData {
  name: string;
  content: string;
}

const countryInfo: Record<string, CountryData> = {
  "South Africa": {
    name: "South Africa",
    content: "South Africa faces significant water stress, with agriculture accounting for over 60% of freshwater use. The country has implemented water allocation reform through its National Water Act, establishing catchment management agencies to oversee equitable water distribution among competing users.",
  },
  "Australia": {
    name: "Australia",
    content: "Australia's Murray-Darling Basin Plan represents one of the world's most comprehensive water allocation frameworks. The system uses tradeable water entitlements and caps on diversions to balance agricultural, environmental, and urban water needs across four states.",
  },
  "United States of America": {
    name: "United States",
    content: "Water allocation in the US varies significantly by state, from riparian rights in the East to prior appropriation in the West. Groundwater overdraft in regions like California's Central Valley has prompted new monitoring requirements and sustainability regulations.",
  },
  "India": {
    name: "India",
    content: "India is the world's largest groundwater user, with agriculture consuming over 90% of extracted groundwater. Many aquifers face critical depletion, prompting initiatives like the Atal Bhujal Yojana to improve community-based groundwater management.",
  },
  "Germany": {
    name: "Germany",
    content: "Germany's water management is governed by the Federal Water Act, with abstraction permits required for significant withdrawals. Recent droughts have intensified focus on agricultural water efficiency and aquifer protection in key farming regions.",
  },
  "Spain": {
    name: "Spain",
    content: "Spain operates one of Europe's most developed water markets through its River Basin Authorities. The country balances intensive irrigated agriculture with environmental flows, using water trading mechanisms to improve allocation efficiency.",
  },
  "Brazil": {
    name: "Brazil",
    content: "Brazil holds approximately 12% of the world's freshwater resources, yet faces regional disparities. The National Water Agency oversees allocation through permits, with increasing attention to agricultural abstraction from the Guarani Aquifer system.",
  },
  "China": {
    name: "China",
    content: "China's water allocation system uses a 'three red lines' policy: caps on total water use, efficiency standards, and pollution limits. The North faces severe scarcity while agriculture in groundwater-dependent regions requires careful management.",
  },
  "Chile": {
    name: "Chile",
    content: "Chile pioneered water markets in 1981, separating water rights from land ownership. While this approach enabled efficient trading, it has also led to concerns about speculation and access inequality, prompting ongoing debates about regulatory reform and environmental protections.",
  },
  "Mexico": {
    name: "Mexico",
    content: "Mexico manages water through its National Water Commission (CONAGUA), with agriculture consuming about 76% of available water. Aquifer overexploitation in northern regions and competing urban demands have intensified pressure on allocation frameworks.",
  },
  "Greece": {
    name: "Greece",
    content: "Greece faces water scarcity challenges particularly in its islands and agricultural regions. EU Water Framework Directive implementation has driven reforms in river basin management, though irrigation efficiency and groundwater monitoring remain key priorities.",
  },
  "United Kingdom": {
    name: "United Kingdom",
    content: "The UK's Environment Agency oversees water abstraction licensing, balancing agricultural, industrial, and environmental needs. Climate change and population growth have prompted reviews of abstraction reform to ensure sustainable water management.",
  },
  "France": {
    name: "France",
    content: "France manages water through River Basin Agencies under the Water Framework Directive. Agricultural irrigation, particularly in southern regions, faces increasing pressure from drought conditions, driving investment in efficiency measures and alternative storage solutions.",
  },
  "Italy": {
    name: "Italy",
    content: "Italy faces growing water stress, particularly in the Po River basin which supports intensive agriculture. Regional water authorities manage allocation under EU directives, while aging infrastructure and climate variability challenge efficient distribution across agricultural and urban sectors.",
  },
  "Portugal": {
    name: "Portugal",
    content: "Portugal's water management is shaped by Mediterranean climate pressures and EU Water Framework Directive requirements. The Alqueva Dam project transformed southern irrigation, while ongoing challenges include balancing agricultural demand with ecosystem protection in increasingly dry conditions.",
  },
  "Namibia": {
    name: "Namibia",
    content: "Namibia, one of Africa's driest countries, has developed innovative water management approaches including pioneering direct potable water reuse. Agricultural allocation faces unique challenges with limited groundwater and variable rainfall, driving investment in efficient irrigation technologies.",
  },
};

const defaultContent: CountryData = {
  name: "Global Water Governance",
  content: "Hover over a country to learn about its water allocation challenges and governance frameworks. Water management approaches vary significantly based on climate, agriculture patterns, and institutional capacity.",
};

const WorldMap: React.FC = () => {
  const [hoveredCountry, setHoveredCountry] = useState<CountryData>(defaultContent);

  return (
    <div className="w-full py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-2xl md:text-3xl font-semibold text-[#21177a] mb-8 font-['Open_Sans']">
          Water governance challenges around the world
        </h3>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Map Section */}
          <div className="w-full lg:w-3/5 bg-[#f8f9fa] rounded-lg border border-[#e5e7eb] p-4">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 120,
                center: [0, 30],
              }}
              style={{ width: "100%", height: "auto" }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const countryName = geo.properties.name;
                    const isHighlighted = countryInfo[countryName] !== undefined;
                    const isHovered = hoveredCountry.name === countryName;

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => {
                          if (countryInfo[countryName]) {
                            setHoveredCountry(countryInfo[countryName]);
                          }
                        }}
                        onMouseLeave={() => {
                          setHoveredCountry(defaultContent);
                        }}
                        style={{
                          default: {
                            fill: isHighlighted ? "#9ca3af" : "#d1d5db",
                            stroke: "#ffffff",
                            strokeWidth: 0.5,
                            outline: "none",
                          },
                          hover: {
                            fill: isHighlighted ? "#21177a" : "#d1d5db",
                            stroke: "#ffffff",
                            strokeWidth: 0.5,
                            outline: "none",
                            cursor: isHighlighted ? "pointer" : "default",
                          },
                          pressed: {
                            fill: "#21177a",
                            stroke: "#ffffff",
                            strokeWidth: 0.5,
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
          </div>

          {/* Text Section */}
          <div className="w-full lg:w-2/5 flex flex-col justify-center">
            <div className="bg-white rounded-lg border border-[#e5e7eb] p-6 shadow-sm">
              <h4 className="text-xl font-semibold text-[#3366CC] mb-4 font-['Fira_Code']">
                {hoveredCountry.name}
              </h4>
              <p className="text-[#4a5568] leading-relaxed font-['Open_Sans'] text-base">
                {hoveredCountry.content}
              </p>
            </div>
            <p className="text-sm text-[#6b7280] mt-4 font-['IBM_Plex_Mono']">
              Highlighted countries have detailed information available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
