export const SIGN_VARIANTS = {
  hidden: {
    opacity: 0,
    x: 100, 
    rotateX: -30, 
    rotateY: -20, 
  },
  visible: {
    opacity: 1,
    x: 0, 
    rotateX: 0,
    rotateY: 0,
    transition: {
      x: {
        type: 'spring',
        stiffness: 200, 
        damping: 18,
        mass: 0.8,
      },
      rotateX: {
        type: 'spring',
        stiffness: 250, 
        damping: 12,
        mass: 0.4,
      },
      rotateY: {
        type: 'spring',
        stiffness: 200,
        damping: 10,
        mass: 0.4,
      },
      opacity: { duration: 0.4 }, 
    },
  },
};