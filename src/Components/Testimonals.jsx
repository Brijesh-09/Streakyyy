import React from "react";

export default function TestimonialSection() {
  return (
    <div className="flex justify-between space-x-8 px-8 py-8 bg-gray-200">
      {/* Testimonial 1 */}
      <div className="text-center">
        <p className="text-lg italic text-gray-800">"Simple, straightforward, and super powerful"</p>
      </div>

      {/* Testimonial 2 */}
      <div className="text-center">
        <p className="text-lg italic text-gray-800">"The best to-do list app on the market"</p>
      </div>

      {/* Testimonial 3 */}
      <div className="text-center">
        <p className="text-lg italic text-gray-800">"Nothing short of stellar"</p>
      </div>
    </div>
  );
}
