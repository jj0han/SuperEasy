type IconModule = { default: string };

// Import all images from the "icons" folder
const modules: Record<string, IconModule> = import.meta.glob(
  "./icons/*.{png,jpg,svg}",
  { eager: true }
);

// Convert the module paths to a key-value object
const icons = Object.entries(modules).reduce((acc, [path, module]) => {
  const name =
    path
      .split("/")
      .pop()
      ?.replace(/\.(png|jpg|svg)$/, "") ?? "";
  acc[name] = module.default; // `module.default` contains the image URL
  return acc;
}, {} as Record<string, string>);

export default icons;
