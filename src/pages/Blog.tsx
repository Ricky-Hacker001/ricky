import { blogs } from "@/data/blogs";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Blog = () => {

  return (
    <>
      <Navbar />

      <section className="py-20 px-6 md:px-10 lg:px-24">

        <div className="container mx-auto">

          <h2 className="section-heading">
            Security Research & Blog
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mt-10">

            {blogs.map((blog) => (

              <Link key={blog.id} to={`/blog/${blog.id}`}>

                <Card className="bg-portfolio-light-navy border-portfolio-lightest-navy hover:border-portfolio-teal transition h-full hover:shadow-lg hover:shadow-portfolio-teal/20">

                  <CardContent className="p-6">

                    <div className="flex justify-between items-center mb-4">

                      <FileText className="text-portfolio-teal" />

                      <span className="text-xs text-portfolio-slate">
                        {blog.date}
                      </span>

                    </div>

                    <h3 className="text-xl font-semibold text-portfolio-lightest-slate mb-2">
                      {blog.title}
                    </h3>

                    <p className="text-portfolio-slate">
                      {blog.description}
                    </p>

                  </CardContent>

                </Card>

              </Link>

            ))}

          </div>

        </div>

      </section>
    </>
  );
};

export default Blog;