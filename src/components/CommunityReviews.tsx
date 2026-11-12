import React, { useState } from 'react';
import { Star, MessageSquare, Heart, ShieldCheck, Plus, CheckCircle2 } from 'lucide-react';
import { REVIEWS } from '../data/bakeryData';
import { ReviewItem } from '../types';

export const CommunityReviews: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    handle: '',
    rating: 5,
    location: 'Airport City Kiosk',
    comment: '',
    favoriteLoaf: 'Heritage Wild Sourdough Boule',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    const created: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: newReview.author || 'Artisan Bread Fan',
      handle: newReview.handle ? (newReview.handle.startsWith('@') ? newReview.handle : `@${newReview.handle}`) : '@breadlover',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      rating: newReview.rating,
      date: 'Just now',
      location: newReview.location,
      comment: newReview.comment,
      favoriteLoaf: newReview.favoriteLoaf,
      verifiedOrder: true,
    };
    setReviewsList([created, ...reviewsList]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowReviewModal(false);
      setNewReview({
        author: '',
        handle: '',
        rating: 5,
        location: 'Airport City Kiosk',
        comment: '',
        favoriteLoaf: 'Heritage Wild Sourdough Boule',
      });
    }, 1500);
  };

  return (
    <section className="py-20 bg-[#111113] border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-amber-400 uppercase mb-2">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>THE BREAD SWAGGER COMMUNITY</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Loved across Ghana, <br />
              <span className="text-zinc-400 font-normal">night & day.</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowReviewModal(true)}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Leave a Review</span>
            </button>
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-zinc-400 font-mono mt-0.5 block">
                4.9 / 5.0 (850+ ratings)
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 flex flex-col justify-between hover:border-zinc-700 transition-all hover:-translate-y-0.5"
            >
              <div className="space-y-4">
                {/* Header author */}
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white truncate">
                        {rev.author}
                      </span>
                      {rev.verifiedOrder && (
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      )}
                    </div>
                    <span className="text-[11px] text-zinc-500 font-mono block truncate">
                      {rev.handle}
                    </span>
                  </div>
                </div>

                {/* Stars & Location */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    {rev.location}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Loaf Tag */}
              <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px]">
                <span className="text-zinc-500 font-mono">Favorite:</span>
                <span className="text-amber-400 font-medium truncate max-w-[140px]">
                  {rev.favoriteLoaf}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Social Tag Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6 fill-amber-500/30" />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-white">
                Tag @swaggersbake_ on Instagram & TikTok
              </h4>
              <p className="text-xs text-zinc-400">
                Snap a clip cracking the hot blistered crust. Get featured and win a week of free bread.
              </p>
            </div>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold whitespace-nowrap transition-colors"
          >
            #SwaggersBake Feed
          </a>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <h3 className="font-display text-xl font-bold text-white mb-1">
              Share Your Bread Swagger
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Tell the community about your hot stone-bake experience.
            </p>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Thank you!</h4>
                <p className="text-xs text-zinc-400">Your review was posted to the wall.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nana Yaw"
                    value={newReview.author}
                    onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">Social Handle</label>
                  <input
                    type="text"
                    placeholder="@nanayaw"
                    value={newReview.handle}
                    onChange={(e) => setNewReview({ ...newReview, handle: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-zinc-400 block mb-1">Rating</label>
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value={5}>5 Stars (Exceptional)</option>
                      <option value={4}>4 Stars (Very Good)</option>
                      <option value={3}>3 Stars (Decent)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-400 block mb-1">Location</label>
                    <select
                      value={newReview.location}
                      onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-amber-500"
                    >
                      <option>Airport City Kiosk</option>
                      <option>East Legon Station</option>
                      <option>Accra Mall Plaza</option>
                      <option>Osu Oxford Street</option>
                      <option>KNUST Kumasi Hub</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">Your Review</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="How was the heat, crust crackle, and crumb texture?"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="flex-1 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider shadow-lg shadow-amber-500/20"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
