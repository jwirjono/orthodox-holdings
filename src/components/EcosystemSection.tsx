import React, { useState } from 'react';
import { ECOSYSTEM_NODES } from '../data/orthodoxData';
import { EcosystemNode } from '../types';
import { ArrowDown, ExternalLink, ShieldCheck, Layers, Sparkles } from 'lucide-react';

export const EcosystemSection: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<EcosystemNode>(ECOSYSTEM_NODES[0]);

  const businessNodes = ECOSYSTEM_NODES.filter((n) => n.category === 'business');
  const wealthNodes = ECOSYSTEM_NODES.filter((n) => n.category === 'wealth');

  return (
    <section id="ecosystem" className="py-24 bg-[#080808] text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-800">
          <div>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mt-2">
              Our Ecosystem
            </h2>
          </div>
          <p className="text-sm text-neutral-400 font-light max-w-md mt-4 md:mt-0">
            One Business. One Advisory Ecosystem. Most advisory firms stop at the business — we continue beyond it.
          </p>
        </div>

        {/* Interactive Architecture Flowchart */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Flow Diagram (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Business Solutions Box */}
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xs">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-800">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full" />
                  Orthodox Business Solutions
                </span>
                <span className="text-[10px] font-mono text-neutral-500 uppercase">Enterprise Core</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {businessNodes.map((node) => {
                  const isSelected = selectedNode.id === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`p-4 border text-left transition-all ${
                        isSelected
                          ? 'bg-white text-black border-white font-medium shadow-md'
                          : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-600 hover:text-white'
                      }`}
                    >
                      <span className={`text-[10px] font-mono block mb-1 ${isSelected ? 'text-neutral-600' : 'text-neutral-500'}`}>
                        BUSINESS // NODE
                      </span>
                      <span className="text-sm font-sans font-semibold block">{node.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Seamless Transition Threshold Connector */}
            <div className="relative py-4 text-center">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-dashed border-neutral-700" />
              </div>
              <div className="relative inline-flex items-center gap-2 px-4 py-1.5 bg-[#080808] border border-neutral-700 text-xs font-mono uppercase tracking-widest text-neutral-300">
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                <span>Value Extension Threshold</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </div>
            </div>

            {/* Wealth Management Box */}
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xs">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-800">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-300 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                  Orthodox Wealth Management
                </span>
                <a
                  href="https://orthodoxwm.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-mono text-neutral-400 hover:text-white underline"
                >
                  orthodoxwm.com ➔
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {wealthNodes.map((node) => {
                  const isSelected = selectedNode.id === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`p-4 border text-left transition-all ${
                        isSelected
                          ? 'bg-white text-black border-white font-medium shadow-md'
                          : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-600 hover:text-white'
                      }`}
                    >
                      <span className={`text-[10px] font-mono block mb-1 ${isSelected ? 'text-emerald-600' : 'text-neutral-500'}`}>
                        WEALTH // NODE
                      </span>
                      <span className="text-sm font-sans font-semibold block">{node.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Node Inspector Panel (4 cols) */}
          <div className="lg:col-span-4 bg-neutral-900 border border-neutral-800 p-6 sticky top-28">
            <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2">
              Ecosystem Node Inspector
            </div>

            <div className="inline-block px-2 py-0.5 text-[10px] font-mono uppercase bg-neutral-950 border border-neutral-800 text-neutral-300 mb-4">
              {selectedNode.category === 'business' ? 'Orthodox Business Solutions' : 'Orthodox Wealth Management'}
            </div>

            <h3 className="text-2xl font-light text-white font-sans mb-3">
              {selectedNode.title}
            </h3>

            <p className="text-xs text-neutral-300 font-light leading-relaxed mb-6">
              {selectedNode.description}
            </p>

            <div className="p-4 bg-neutral-950 border border-neutral-800 space-y-3">
              <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                Cross-Ecosystem Synergy:
              </span>
              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                {selectedNode.category === 'business'
                  ? `Every outcome in ${selectedNode.title} directly influences long-term personal wealth retention, asset protection, and tax-sheltered family inheritance.`
                  : `Personal wealth strategy in ${selectedNode.title} informs the capital retention goals, liquidity reserves, and corporate dividend structures of the business.`}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-800">
              <p className="text-[11px] text-neutral-400 italic">
                "Through our integrated ecosystem, business owners receive coordinated advice across both their business and personal financial lives."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
