// app/portfolio/page.tsx
"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { data } from "@/lib/data/index";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('frontend');

  const filteredProjects = activeFilter === 'all' 
    ? data.projects 
    : data.projects.filter(project => 
        project.techStack.some(tech => tech.toLowerCase() === activeFilter.toLowerCase())
      );

  return (
    <motion.main 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-12 pt-24"
    >
      {/* Services Section */}
      <motion.section variants={itemVariants} className="mb-20">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.services.map((service) => (
            <motion.div 
              key={service.title}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="hover:shadow-xl transition-all h-full bg-card/50 backdrop-blur-sm">
                <CardHeader className="items-center text-center">
                  <div className="text-5xl mb-4 text-primary">{service.icon}</div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <CardDescription className="mt-2">{service.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex flex-wrap gap-2 justify-center">
                  {service.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-sm">
                      {tech}
                    </Badge>
                  ))}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section variants={itemVariants} className="mb-20">
        <h2 className="text-4xl font-bold mb-12 text-center">Technical Expertise</h2>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-2/3 mx-auto grid-cols-3 bg-muted/50">
            {Object.keys(data.skills).map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.entries(data.skills).map(([category, skills]) => (
            <TabsContent key={category} value={category} className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill) => (
                  <Card key={skill.name} className="relative overflow-hidden group">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <span className="text-3xl">{skill.icon}</span>
                      <div>
                        <CardTitle>{skill.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {/* <Progress 
                            value={skill.levelPercentage} 
                            className="h-2 bg-muted w-[120px]"
                            indicatorClassName="bg-primary"
                          /> */}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{skill.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {skill.projects}+ projects
                      </span>
                      <Badge variant="outline">{skill.level}</Badge>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.section>

      {/* Projects Section */}
      <motion.section variants={itemVariants}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <h2 className="text-4xl font-bold">Featured Work</h2>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={activeFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('all')}
              className="rounded-full"
            >
              All
            </Button>
            {Array.from(new Set(data.projects.flatMap(p => p.techStack))).map(tech => (
              <Button
                key={tech}
                variant={activeFilter === tech ? 'default' : 'outline'}
                onClick={() => setActiveFilter(tech)}
                className="rounded-full"
              >
                {tech}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.div 
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="group relative"
            >
              <Card className="hover:shadow-xl transition-all h-full flex flex-col">
                <CardContent className="p-0 relative flex-1">
                  <AspectRatio ratio={16/9} className="relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex gap-2 flex-wrap">
                        {project.techStack.map((tech) => (
                          <Badge 
                            key={tech} 
                            variant="secondary"
                            className="backdrop-blur-sm bg-muted/50"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </AspectRatio>
                  <div className="p-6">
                    <CardTitle className="mb-2">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-3 mb-4">
                      {project.description}
                    </CardDescription>
                    <div className="flex gap-3">
                      <Button 
                        asChild 
                        variant="outline" 
                        className="gap-2"
                        size="sm"
                      >
                        <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                          <FiGithub className="w-4 h-4" />
                          Code
                        </a>
                      </Button>
                      <Button 
                        asChild 
                        className="gap-2"
                        size="sm"
                      >
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <FiExternalLink className="w-4 h-4" />
                          Demo
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      {/* <motion.footer 
        variants={itemVariants}
        className="mt-20 py-8 border-t text-center text-muted-foreground"
      >
        <div className="flex justify-center gap-4 mb-4">
          {data?.socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <link.icon className="w-6 h-6" />
            </a>
          ))}
        </div> 
         <p>&copy; {new Date().getFullYear()} {data.name} All rights reserved.</p>
      </motion.footer> */}
    </motion.main>
  );
}