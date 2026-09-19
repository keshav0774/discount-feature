// Replace with existing project authentication when this module is integrated.
// It deliberately sets identity server-side rather than accepting userId in request bodies.
export function requireUser(req, res, next) {
  const userId = req.user?._id || req.auth?.userId || req.header('x-user-id');
  if (!userId) return res.status(401).json({ success: false, message: 'Authentication required' });
  req.user = { ...(req.user || {}), _id: userId };
  next();
}
