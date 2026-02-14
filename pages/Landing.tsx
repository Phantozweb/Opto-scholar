
import React, { useState } from 'react';
import { Header } from '../components/landing/Header';
import { Footer } from '../components/landing/Footer';
import { X, IndianRupee, QrCode, Wallet, CheckCircle2, ArrowRight, Copy, Check, Smartphone, Receipt } from 'lucide-react';

interface LandingProps {
  onNavigate: (page: string) => void;
  onSearch: (term: string) => void;
}

export const Landing: React.FC<LandingProps> = ({ onNavigate, onSearch }) => {
  const [term, setTerm] = useState('');
  const [showDonateModal, setShowDonateModal] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term);
    } else {
      onNavigate('home');
    }
  };

  const handleTopicClick = (topic: string) => {
      onSearch(topic);
  }

  return (
    <div className="antialiased selection:bg-teal selection:text-white flex flex-col min-h-screen">
      <Header onNavigate={onNavigate} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-teal-light/50 -z-10 rounded-l-[100px] opacity-50"></div>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-wrap gap-4 mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-light text-teal border border-teal/20">
                        <span className="material-symbols-outlined text-sm">verified_user</span>
                        <span className="text-xs font-bold uppercase tracking-widest">Specialized Clinical Engine</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 text-slate-500 border border-slate-200">
                        <span className="material-symbols-outlined text-sm">description</span>
                        <span className="text-xs font-bold uppercase tracking-widest text-navy">1M+ Articles</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 text-slate-500 border border-slate-200">
                        <span className="material-symbols-outlined text-sm">library_books</span>
                        <span className="text-xs font-bold uppercase tracking-widest text-navy">50+ Journals Indexed</span>
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h1 className="text-5xl lg:text-7xl leading-[1.1] text-navy font-serif">
                            Precision Search for <span className="text-teal italic">Optometry</span> and Ophthalmology
                        </h1>
                        <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
                            Cut through the noise of general academic engines with a specialized tool built for eye-care research and clinical application.
                        </p>
                        <div className="flex flex-wrap gap-6 pt-4">
                            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                                <span className="material-symbols-outlined text-teal">check_circle</span>
                                Peer-reviewed only
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                                <span className="material-symbols-outlined text-teal">check_circle</span>
                                Clinical guidelines
                            </div>
                        </div>
                    </div>
                    <div className="glass-card p-8 rounded-3xl border border-white/50 relative">
                        <div className="absolute -top-4 -left-4 w-20 h-20 bg-teal/10 rounded-full blur-2xl"></div>
                        <div className="space-y-6">
                            <div className="flex justify-between items-end">
                                <h3 className="text-2xl font-bold text-navy font-serif">Global Database Access</h3>
                                <div className="text-right hidden sm:block">
                                    <span className="block text-[10px] font-bold text-teal uppercase tracking-widest">Verified Index</span>
                                    <span className="text-xs font-bold text-slate-400">Updated Daily</span>
                                </div>
                            </div>
                            <form onSubmit={handleSearch} className="space-y-4">
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                                    <input 
                                        type="text"
                                        value={term}
                                        onChange={(e) => setTerm(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 rounded-xl border-slate-200 focus:border-teal focus:ring-teal bg-white shadow-inner" 
                                        placeholder="Search clinical trials, myopia..." 
                                    />
                                </div>
                                <button type="submit" className="w-full academic-gradient text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                                    Search Eye Research
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </form>
                            <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100/50">
                                <div className="flex flex-col">
                                    <span className="text-2xl font-bold text-navy">1,000,000+</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Research Articles</span>
                                </div>
                                <div className="flex flex-col border-l border-slate-100 pl-4">
                                    <span className="text-2xl font-bold text-navy">50+</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Indexed Journals</span>
                                </div>
                            </div>
                            <div className="pt-2">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-3">Trending Research Topics</p>
                                <div className="flex flex-wrap gap-2 items-center">
                                    <span onClick={() => handleTopicClick('Glaucoma Management')} className="px-3 py-1 bg-slate-100 rounded-md text-xs font-medium text-slate-600 cursor-pointer hover:bg-teal-light hover:text-teal transition-colors">Glaucoma Management</span>
                                    <span onClick={() => handleTopicClick('Scleral Lenses')} className="px-3 py-1 bg-slate-100 rounded-md text-xs font-medium text-slate-600 cursor-pointer hover:bg-teal-light hover:text-teal transition-colors">Scleral Lenses</span>
                                    <span onClick={() => handleTopicClick('Gene Therapy')} className="px-3 py-1 bg-slate-100 rounded-md text-xs font-medium text-slate-600 cursor-pointer hover:bg-teal-light hover:text-teal transition-colors">Gene Therapy</span>
                                    <span className="text-xs text-slate-400 font-medium italic pl-1">etc.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Problem Section */}
        <section className="bg-slate-50 py-24 border-y border-slate-200">
            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-3xl mb-16">
                    <h2 className="text-4xl text-navy mb-4 font-serif">The Exhaustion of General Search</h2>
                    <p className="text-lg text-slate-600">General academic engines are cluttered. OptoScholar filters out the noise so you can focus on clinical relevance.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-12">
                    <div className="group">
                        <div className="mb-6 w-14 h-14 flex items-center justify-center rounded-2xl bg-white border border-slate-200 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all shadow-sm">
                            <span className="material-symbols-outlined">filter_list_off</span>
                        </div>
                        <h4 className="text-xl font-bold mb-3 font-serif">Irrelevant Results</h4>
                        <p className="text-slate-600 leading-relaxed">Wading through non-clinical data makes research inefficient. Generic engines often prioritize popularity over specificity.</p>
                    </div>
                    <div className="group">
                        <div className="mb-6 w-14 h-14 flex items-center justify-center rounded-2xl bg-white border border-slate-200 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-sm">
                            <span className="material-symbols-outlined">account_tree</span>
                        </div>
                        <h4 className="text-xl font-bold mb-3 font-serif">Scattered Sources</h4>
                        <p className="text-slate-600 leading-relaxed">Journals spread across too many platforms creates friction. You shouldn't need five tabs open to find one answer.</p>
                    </div>
                    <div className="group">
                        <div className="mb-6 w-14 h-14 flex items-center justify-center rounded-2xl bg-white border border-slate-200 text-navy group-hover:bg-navy group-hover:text-white transition-all shadow-sm">
                            <span className="material-symbols-outlined">hourglass_empty</span>
                        </div>
                        <h4 className="text-xl font-bold mb-3 font-serif">Time Drain</h4>
                        <p className="text-slate-600 leading-relaxed">Losing hours to imprecise queries delays clinical application. Your time is better spent with patients.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Solution Section */}
        <section className="py-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div>
                        <span className="text-teal font-bold text-sm tracking-widest uppercase mb-2 block">The Solution</span>
                        <h2 className="text-4xl text-navy font-serif">A Focused Research Ecosystem</h2>
                    </div>
                    <p className="text-slate-500 max-w-sm">Designed specifically for the eye-care discipline to deliver clinical precision.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Solution Card 1 */}
                    <div className="group border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all hover:border-teal/30">
                        <div className="bg-teal-light/50 p-6 flex justify-between items-center group-hover:bg-teal group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined">menu_book</span>
                            <span className="text-xs font-bold uppercase">01</span>
                        </div>
                        <div className="p-8">
                            <h3 className="text-xl font-bold mb-3 font-serif">Curated Indexing</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">Only peer-reviewed eye care journals and trusted sources make it into our index.</p>
                        </div>
                    </div>
                    {/* Solution Card 2 */}
                    <div className="group border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all hover:border-teal/30">
                        <div className="bg-teal-light/50 p-6 flex justify-between items-center group-hover:bg-teal group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined">clinical_notes</span>
                            <span className="text-xs font-bold uppercase">02</span>
                        </div>
                        <div className="p-8">
                            <h3 className="text-xl font-bold mb-3 font-serif">Clinical Priority</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">Algorithms that rank results based on clinical relevance and citation impact.</p>
                        </div>
                    </div>
                    {/* Solution Card 3 */}
                    <div className="group border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all hover:border-teal/30">
                        <div className="bg-teal-light/50 p-6 flex justify-between items-center group-hover:bg-teal group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined">verified</span>
                            <span className="text-xs font-bold uppercase">03</span>
                        </div>
                        <div className="p-8">
                            <h3 className="text-xl font-bold mb-3 font-serif">Zero Noise</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">Filtered specifically for clinicians and researchers, removing general bio-med clutter.</p>
                        </div>
                    </div>
                    {/* Solution Card 4 */}
                    <div className="group border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all hover:border-teal/30">
                        <div className="bg-teal-light/50 p-6 flex justify-between items-center group-hover:bg-teal group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined">bolt</span>
                            <span className="text-xs font-bold uppercase">04</span>
                        </div>
                        <div className="p-8">
                            <h3 className="text-xl font-bold mb-3 font-serif">Instant Access</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">Direct links to authoritative sources and institutional login integrations.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-24 bg-navy text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <h2 className="text-4xl text-center mb-16 font-serif">Built for Every Stage of Practice</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-teal/20 text-teal flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined">school</span>
                        </div>
                        <h4 className="text-2xl mb-4 font-serif">The Student</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">Exam preparation and thesis research made simple with topic-specific filters and curated study sets.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-teal/20 text-teal flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined">stethoscope</span>
                        </div>
                        <h4 className="text-2xl mb-4 font-serif">The Clinician</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">Quick chair-side reference for rare conditions, drug interactions, and latest management protocols.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-teal/20 text-teal flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined">biotech</span>
                        </div>
                        <h4 className="text-2xl mb-4 font-serif">The Researcher</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">Deep literature reviews with comprehensive citation tracking, impact factor filters, and export tools.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Info Section */}
        <section className="py-12 border-b border-slate-100">
            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-slate-50 border-l-4 border-teal p-8 rounded-r-2xl flex items-start gap-6">
                    <span className="material-symbols-outlined text-teal text-3xl">info</span>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed italic">
                        "OptoScholar indexes abstracts and references for speed. Full-text access is facilitated through original journals, PubMed, or Google Scholar via your institutional credentials, ensuring compliant and rapid delivery of data."
                    </p>
                </div>
            </div>
        </section>

        {/* Contribution / CTA Section */}
        <section className="py-24 bg-gradient-to-b from-white to-slate-50 border-t border-slate-100">
            <div className="max-w-5xl mx-auto px-6 text-center space-y-12">
                <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl text-navy font-serif">Contribute to the Vision</h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        OptoScholar is a community-driven initiative. Help us maintain clinical precision and keep the engine running for eye-care professionals worldwide.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 text-left">
                    {/* Suggestion Card */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-teal/30 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-6xl text-teal">lightbulb</span>
                        </div>
                        <div className="w-12 h-12 bg-teal-light rounded-2xl flex items-center justify-center text-teal mb-6 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined">forum</span>
                        </div>
                        <h3 className="text-xl font-bold text-navy mb-2 font-serif">Make a Suggestion</h3>
                        <p className="text-slate-500 text-sm mb-6 min-h-[60px]">
                            Found a missing journal or have a feature request? Shape the future of the platform.
                        </p>
                        <a href="mailto:support@focuslinks.in" className="inline-flex items-center gap-2 text-sm font-bold text-teal hover:text-teal-700 transition-colors">
                            Send Feedback <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </a>
                    </div>

                    {/* Donation Card */}
                    <div className="bg-navy p-8 rounded-3xl border border-navy shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden text-white transform md:-translate-y-4">
                         <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-6xl text-white">volunteer_activism</span>
                        </div>
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform border border-white/20">
                            <span className="material-symbols-outlined">favorite</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 font-serif">Donate & Sustain</h3>
                        <p className="text-slate-300 text-sm mb-6 min-h-[60px]">
                            Help cover server costs and API fees. Donors get exclusive early access to new AI tools.
                        </p>
                        <button 
                            onClick={() => setShowDonateModal(true)}
                            className="w-full py-3 rounded-xl bg-teal text-white font-bold hover:bg-teal-600 transition-colors shadow-lg border border-teal-400/30"
                        >
                            Become a Supporter
                        </button>
                    </div>

                    {/* Share Card */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-teal/30 transition-all group relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-6xl text-teal">share</span>
                        </div>
                        <div className="w-12 h-12 bg-teal-light rounded-2xl flex items-center justify-center text-teal mb-6 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined">reviews</span>
                        </div>
                        <h3 className="text-xl font-bold text-navy mb-2 font-serif">Rate & Share</h3>
                        <p className="text-slate-500 text-sm mb-6 min-h-[60px]">
                            Help your colleagues find us. A simple share helps the network grow stronger.
                        </p>
                        <button className="inline-flex items-center gap-2 text-sm font-bold text-teal hover:text-teal-700 transition-colors">
                            Share OptoScholar <span className="material-symbols-outlined text-sm">share</span>
                        </button>
                    </div>
                </div>

                <div className="pt-8 flex justify-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Active Community
                    </p>
                </div>
            </div>
        </section>
      </main>

      <Footer />

      {/* Donation Modal */}
      {showDonateModal && <DonationModal onClose={() => setShowDonateModal(false)} />}
    </div>
  );
};

// Donation Component
const DonationModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [step, setStep] = useState<'details' | 'qr'>('details');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState<number>(100);
    const [customAmount, setCustomAmount] = useState<string>('');
    const [error, setError] = useState('');
    const [paymentId, setPaymentId] = useState('');

    const MIN_AMOUNT = 100;
    const UPI_ID = 'focuslinks@upi';

    const handleAmountSelect = (val: number) => {
        setAmount(val);
        setCustomAmount('');
        setError('');
    };

    const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setCustomAmount(val);
        if (val && !isNaN(Number(val))) {
            setAmount(Number(val));
        }
        setError('');
    };

    const handleNext = () => {
        if (!name.trim() || !email.trim()) {
            setError('Please provide your name and email.');
            return;
        }
        if (amount < MIN_AMOUNT) {
            setError(`Minimum donation amount is ₹${MIN_AMOUNT}`);
            return;
        }
        
        // Generate Payment ID (Random alphanumeric)
        const pid = 'PL' + Math.random().toString(36).substr(2, 6).toUpperCase();
        setPaymentId(pid);
        
        setStep('qr');
    };

    // Create Remark: NAME-ID-DATE
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const safeName = name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 10); // Sanitize name
    const remark = `${safeName}-${paymentId}-${dateStr}`;

    const upiLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent("FocusLinks")}&am=${amount}&cu=INR&tn=${encodeURIComponent(remark)}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}&bgcolor=ffffff`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="bg-navy p-6 text-white relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-white/10 rounded-lg">
                            <Wallet size={20} className="text-teal" />
                        </div>
                        <h2 className="text-xl font-bold font-serif">Support OptoScholar</h2>
                    </div>
                    <p className="text-sm text-slate-300">Your contribution powers the servers and keeps the search index ad-free.</p>
                </div>

                <div className="p-6">
                    {step === 'details' ? (
                        <div className="space-y-5">
                            <div className="space-y-3">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">Your Details</label>
                                <input 
                                    type="text" 
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal focus:ring-teal text-slate-900"
                                />
                                <input 
                                    type="email" 
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal focus:ring-teal text-slate-900"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">Select Amount</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[100, 500, 1000].map((val) => (
                                        <button
                                            key={val}
                                            onClick={() => handleAmountSelect(val)}
                                            className={`py-2 rounded-xl font-bold text-sm transition-all border ${
                                                amount === val && !customAmount
                                                    ? 'bg-teal text-white border-teal shadow-md' 
                                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                            }`}
                                        >
                                            ₹{val}
                                        </button>
                                    ))}
                                </div>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                        <IndianRupee size={16} />
                                    </span>
                                    <input 
                                        type="number" 
                                        placeholder="Custom Amount (Min ₹100)"
                                        value={customAmount}
                                        onChange={handleCustomAmountChange}
                                        className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-teal text-slate-900 ${
                                            amount < MIN_AMOUNT ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-teal'
                                        }`}
                                    />
                                </div>
                            </div>

                            {error && (
                                <p className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">error</span>
                                    {error}
                                </p>
                            )}

                            <button 
                                onClick={handleNext}
                                className="w-full bg-navy text-white py-4 rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                            >
                                Proceed to Pay <ArrowRight size={18} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center text-center space-y-6 animate-in fade-in slide-in-from-right-8">
                            <div className="space-y-1">
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">Scan with any UPI App</p>
                                <h3 className="text-3xl font-black text-navy flex items-center justify-center gap-1">
                                    <IndianRupee size={28} strokeWidth={3} /> {amount}
                                </h3>
                                {/* Payment ID Display */}
                                <div className="flex items-center justify-center gap-2 bg-slate-100 px-3 py-1 rounded-full mt-2">
                                    <Receipt size={12} className="text-slate-500" />
                                    <span className="text-xs font-mono font-bold text-slate-600 tracking-wide">Ref: {paymentId}</span>
                                </div>
                            </div>

                            <div className="p-4 bg-white border-2 border-slate-100 rounded-2xl shadow-sm relative group">
                                <img src={qrCodeUrl} alt="UPI QR Code" className="w-48 h-48 mix-blend-multiply" />
                                <div className="absolute inset-0 flex items-center justify-center bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                                    <p className="text-xs font-bold text-navy">focuslinks@upi</p>
                                </div>
                            </div>

                            <a 
                                href={upiLink}
                                className="w-full bg-navy text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-navy/20"
                            >
                                <Smartphone size={18} /> Pay with UPI App
                            </a>

                            <div className="w-full bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center text-teal">
                                        <QrCode size={16} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-bold text-slate-400 uppercase">VPA / UPI ID</p>
                                        <p className="text-sm font-bold text-slate-700 select-all">{UPI_ID}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => navigator.clipboard.writeText(UPI_ID)}
                                    className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-teal"
                                    title="Copy UPI ID"
                                >
                                    <Copy size={18} />
                                </button>
                            </div>

                            <div className="w-full space-y-3">
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    After payment, you will receive a confirmation email at <span className="font-bold text-slate-600">{email}</span> within 24 hours. Quote <span className="font-mono font-bold">{paymentId}</span> for support.
                                </p>
                                <button 
                                    onClick={onClose}
                                    className="w-full bg-teal text-white py-3 rounded-xl font-bold hover:bg-teal-700 transition-all flex items-center justify-center gap-2"
                                >
                                    <Check size={18} /> I've Completed Payment
                                </button>
                                <button 
                                    onClick={() => setStep('details')}
                                    className="text-sm font-bold text-slate-400 hover:text-navy"
                                >
                                    Go Back
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
