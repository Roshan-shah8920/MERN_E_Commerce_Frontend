import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-4">
      <div className="container">
        <div className="row text-start justify-content-center">
          <div className="col-md-3 col-sm-6 mb-3 text-center">
            <img src="logo.png" alt="Company Logo" className="mb-3" style={{ width: '150px' }} />
          </div>
          <div className="col-md-3 col-sm-6 mb-3">
            <h5>Shop</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light">Cart</a></li>
              <li><a href="#" className="text-light">Specials</a></li>
              <li><a href="#" className="text-light">On Sales</a></li>
              <li><a href="#" className="text-light">Our Stores</a></li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6 mb-3">
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light">About</a></li>
              <li><a href="#" className="text-light">Testimonials</a></li>
              <li><a href="#" className="text-light">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6 mb-3">
            <h5>Social</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light">Facebook</a></li>
              <li><a href="#" className="text-light">Instagram</a></li>
              <li><a href="#" className="text-light">Twitter</a></li>
            </ul>
          </div>
        </div>
        <hr className="bg-light" />
        <p className="mb-0">Copyright &copy; 2025 Punhers - Powered by Roshan</p>
        <div className="mt-2">
          <a href="#" className="text-light me-3">Privacy Policy</a>
          <a href="#" className="text-light me-3">Terms and Conditions</a>
          <a href="#" className="text-light">Return & Refund Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;