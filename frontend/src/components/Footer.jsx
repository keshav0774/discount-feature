export default function Footer() {
  return (
    <footer className="border-t border-border pt-11 pb-7">
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="grid grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-8 mb-8">
          <div>
            <div className="font-display font-extrabold text-[19px] mb-3">STRIKE</div>
            <p className="text-text-faint text-[13px] max-w-[280px]">
              Empowering developers with cutting-edge tools and resources. Powered by Coder Army, Strike is
              your gateway to a world of endless coding with guided lessons, real projects, level up your
              skills.
            </p>
          </div>
          <div>
            <h4 className="text-[13px] mb-3.5 text-text">Platform</h4>
            <a href="#" className="block text-[13px] text-text-dim mb-2.5 hover:text-text">Home</a>
            <a href="#" className="block text-[13px] text-text-dim mb-2.5 hover:text-text">Practice</a>
            <a href="#" className="block text-[13px] text-text-dim mb-2.5 hover:text-text">DSA Sheet</a>
          </div>
          <div>
            <h4 className="text-[13px] mb-3.5 text-text">Company</h4>
            <a href="#" className="block text-[13px] text-text-dim mb-2.5 hover:text-text">Contact</a>
          </div>
          <div>
            <h4 className="text-[13px] mb-3.5 text-text">Legal</h4>
            <a href="#" className="block text-[13px] text-text-dim mb-2.5 hover:text-text">Terms of Service</a>
            <a href="#" className="block text-[13px] text-text-dim mb-2.5 hover:text-text">Privacy Policy</a>
          </div>
        </div>
        <div className="border-t border-border pt-5 flex justify-between flex-wrap gap-2 text-text-faint text-xs">
          <span>© 2026 Strike. All rights reserved.</span>
          <span>Code · Learn · Grow</span>
        </div>
      </div>
    </footer>
  );
}
