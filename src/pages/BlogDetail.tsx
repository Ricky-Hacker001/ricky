import Navbar from "@/components/Navbar";
import { useParams } from "react-router-dom";
import { blogs } from "@/data/blogs";
import HackerCodeBlock from "@/components/HackerCodeBlock";
import TypingCode from "@/components/TypingCode";

const BlogDetail = () => {

  const { id } = useParams();

  const blog = blogs.find((b) => b.id === id);

  if (!blog) return <div>Blog not found</div>;

  const lines = blog.content.split("\n");

  const codeBlocks: string[] = [];
  const textBlocks: string[] = [];

  let currentCode = "";
  let inCode = false;

  lines.forEach((line) => {

    if (line.includes("#include") || line.includes("void setup")) {
      inCode = true;
    }

    if (inCode) {
      currentCode += line + "\n";
    } else {
      textBlocks.push(line);
    }

  });

  if (currentCode.length > 0) {
    codeBlocks.push(currentCode);
  }

  return (
    <>
      <Navbar />

      <section className="py-20 px-6 md:px-10 lg:px-24">

        <div className="max-w-3xl mx-auto">

          <h1 className="text-3xl font-bold text-portfolio-lightest-slate mb-4">
            {blog.title}
          </h1>

          <p className="text-sm text-portfolio-slate mb-10">
            {blog.date}
          </p>

          {/* Typing intro */}
          <TypingCode
            text={`$ loading blog...
$ decrypting research notes...
$ access granted`}
          />

          <div className="mt-8 space-y-6 text-portfolio-slate leading-relaxed font-fira-code whitespace-pre-line">

            {textBlocks.map((t, i) => (
              <p key={i}>{t}</p>
            ))}

          </div>

          {codeBlocks.map((code, i) => (
            <HackerCodeBlock
              key={i}
              language="cpp"
              code={code}
            />
          ))}

        </div>

      </section>
    </>
  );
};

export default BlogDetail;