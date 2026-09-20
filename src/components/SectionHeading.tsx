import { motion } from "framer-motion";

type Props = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
};

const SectionHeading = ({ index, eyebrow, title, description }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6 }}
    className="section-intro"
  >
    <div className="section-kicker"><span>{index}</span> {eyebrow}</div>
    <h2>{title}</h2>
    {description ? <p>{description}</p> : null}
  </motion.div>
);

export default SectionHeading;
