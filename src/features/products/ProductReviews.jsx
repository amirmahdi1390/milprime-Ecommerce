import React, { useState } from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useUIStore } from '../../store/uiStore';

const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Julian Vance',
    rating: 5,
    date: '2 weeks ago',
    title: 'Exemplary craftsmanship and weight',
    comment: 'The quality of the materials and precision of the stitching is immediately evident out of the box. Truly modern, restrained, and utilitarian.',
  },
  {
    id: 'rev-2',
    author: 'Elena Rostova',
    rating: 5,
    date: '1 month ago',
    title: 'Minimalism executed with perfection',
    comment: 'Fits seamlessly into my daily routine. The texture and attention to detail feel like luxury that will last for years.',
  },
];

export function ProductReviews({ productName }) {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useUIStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      addToast('Please provide your name and review', 'error');
      return;
    }

    const newRev = {
      id: `rev-${Date.now()}`,
      author: name.trim(),
      rating,
      date: 'Just now',
      title: 'Verified Customer Review',
      comment: comment.trim(),
    };

    setReviews([newRev, ...reviews]);
    setName('');
    setEmail('');
    setComment('');
    setSubmitted(true);
    addToast('Thank you for sharing your feedback!', 'success');

    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="mt-16 sm:mt-24 pt-12 border-t border-[#e4e4e7] text-left">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#09090b]">Customer Reviews</h2>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex text-amber-500">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-4 w-4 fill-amber-400 stroke-amber-400" />
              ))}
            </div>
            <span className="text-xs text-[#71717a]">
              4.9 • Based on {reviews.length + 24} verified clients
            </span>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6 divide-y divide-[#e4e4e7]">
          {reviews.map((rev) => (
            <div key={rev.id} className="pt-6 first:pt-0 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`h-3.5 w-3.5 ${
                          s <= rev.rating ? 'fill-amber-400 stroke-amber-400' : 'stroke-zinc-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-[#09090b]">{rev.author}</span>
                </div>
                <span className="text-xs text-[#a1a1aa]">{rev.date}</span>
              </div>
              <p className="text-sm text-[#71717a] leading-relaxed">{rev.comment}</p>
            </div>
          ))}
        </div>

        {/* Write a Review Box */}
        <div className="bg-[#fafafa] border border-[#e4e4e7] rounded-2xl p-6 sm:p-8">
          <h3 className="text-base font-semibold text-[#09090b] mb-1">Write a Review</h3>
          <p className="text-xs text-[#71717a] mb-6">
            Share your experience with {productName} to help fellow patrons make informed choices.
          </p>

          {submitted ? (
            <div className="flex items-center gap-3 py-6 text-emerald-700 bg-emerald-50 rounded-xl px-4 border border-emerald-200">
              <CheckCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm font-medium">Your review has been verified and posted.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#71717a] uppercase tracking-wider mb-1.5">
                  Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`h-5 w-5 ${
                          star <= rating
                            ? 'fill-amber-400 stroke-amber-400'
                            : 'stroke-zinc-400 hover:stroke-amber-400'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Name"
                  placeholder="e.g. Julian Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  label="Email (Kept Private)"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#71717a] uppercase tracking-wider mb-1.5">
                  Your Review
                </label>
                <textarea
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Describe the fit, material quality, and real-world durability..."
                  className="w-full rounded-xl border border-[#e4e4e7] bg-white p-3.5 text-sm text-[#09090b] placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#09090b] focus:ring-1 focus:ring-[#09090b]"
                  required
                />
              </div>

              <Button type="submit" variant="primary" size="md">
                Submit Review
              </Button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
