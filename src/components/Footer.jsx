import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-4 pb-2 shadow-lg mt-5">
      <div className="container">
        {/* Scrolling Contact Info */}
        <div className="overflow-hidden mb-4">
          <div className="d-flex gap-5 animate-marquee">
            <div>
              <strong>Moses Hika</strong>
            </div>
            <div>
              <strong>Boniface Nderitu</strong>
            </div>
          </div>
        </div>

        {/* Contact Buttons */}
        <div className="row text-center mb-3">
          {/* Moses */}
          <div className="col-md-6 mb-3">
            <h6>Moses Hika</h6>
            <div className="d-flex justify-content-center gap-2 flex-wrap">
              <a href="https://wa.me/254704095021" target="_blank" rel="noopener noreferrer" className="btn btn-success">
                <i className="bi bi-whatsapp me-1"></i> WhatsApp
              </a>
              <a href="mailto:moseshika811@gmail.com" className="btn btn-primary">
                <i className="bi bi-envelope me-1"></i> Email
              </a>
              <a href="tel:+254704095021" className="btn btn-secondary">
                <i className="bi bi-telephone me-1"></i> Call
              </a>
            </div>
          </div>

          {/* Boniface */}
          <div className="col-md-6 mb-3">
            <h6>Boniface Nderitu</h6>
            <div className="d-flex justify-content-center gap-2 flex-wrap">
              <a href="https://wa.me/254759993892" target="_blank" rel="noopener noreferrer" className="btn btn-success">
                <i className="bi bi-whatsapp me-1"></i> WhatsApp
              </a>
              <a href="mailto:bonnnymkuu3939@gmail.com" className="btn btn-primary">
                <i className="bi bi-envelope me-1"></i> Email
              </a>
              <a href="tel:+254759993892" className="btn btn-secondary">
                <i className="bi bi-telephone me-1"></i> Call
              </a>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center small border-top pt-2">
          &copy; {new Date().getFullYear()} All Rights Reserved
        </div>
      </div>

      {/* CSS for marquee animation */}
      <style jsx>{`
        .animate-marquee {
          animation: marquee 20s linear infinite;
          white-space: nowrap;
        }

        @keyframes marquee {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
