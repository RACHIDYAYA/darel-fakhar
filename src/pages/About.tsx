import Header from "@/components/Header";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">من نحن</h1>
        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          نحن تعاونية حرفية متخصصة في صناعة الخزف التقليدي المغربي بلم��ة عصرية. نحتفي بإرث آسفي
          العريق ونضمن جودة عالية في كل قطعة، من الأطباق والزخارف إلى القطع الفنية الفريدة.
        </p>
      </main>
    </div>
  );
};

export default About;
