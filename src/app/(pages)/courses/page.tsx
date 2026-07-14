"use client";

import React, { useState } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  School, 
  ChevronRight, 
  CheckCircle,
  Filter,
  Grid3x3,
  List,
  Star,
  Atom,
  Beaker,
  Book,
  Calculator,
  Dna,
  Languages
} from 'lucide-react';

// Types
interface Board {
  id: string;
  name: string;
  code: 'CBSE' | 'UP';
  description: string;
  color: string;
  icon: React.ReactNode;
}

interface Class {
  id: string;
  number: number;
  boardId: string;
  subjects: string[];
  description: string;
  totalStudents: number;
  passPercentage: number;
  gradeRange: 'primary' | 'secondary' | 'senior';
  imageUrl?: string;
}

interface Course {
  id: string;
  classId: string;
  boardId: string;
  name: string;
  description: string;
  
  modules: number;
  
  rating: number;
  studentsEnrolled: number;
  startDate: string;
  highlights: string[];
  subject: string;
  icon: React.ReactNode;
}

// Sample Data
const boards: Board[] = [
  {
    id: 'cbse',
    name: 'CBSE Board',
    code: 'CBSE',
    description: 'Central Board of Secondary Education',
    color: 'from-blue-600 to-indigo-600',
    icon: <School className="w-6 h-6" />,
  },
  {
    id: 'up',
    name: 'UP Board',
    code: 'UP',
    description: 'Uttar Pradesh State Board',
    color: 'from-orange-500 to-red-600',
    icon: <GraduationCap className="w-6 h-6" />,
  },
];

// Subject icons mapping
const subjectIcons: Record<string, React.ReactNode> = {
  'Mathematics': <Calculator className="w-4 h-4" />,
  'Science': <Beaker className="w-4 h-4" />,
  'English': <Book className="w-4 h-4" />,
  'Physics': <Atom className="w-4 h-4" />,
  'Chemistry': <Beaker className="w-4 h-4" />,
  'Biology': <Dna className="w-4 h-4" />,
  'Hindi': <Languages className="w-4 h-4" />,
  'Social Studies': <GraduationCap className="w-4 h-4" />,
};

// Get subjects based on class range
const getSubjectsForClass = (classNumber: number): string[] => {
  if (classNumber >= 1 && classNumber <= 8) {
    return ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies'];
  } else if (classNumber >= 9 && classNumber <= 10) {
    return ['Mathematics', 'Science', 'English'];
  } else if (classNumber >= 11 && classNumber <= 12) {
    return ['Physics', 'Chemistry', 'Biology', 'English'];
  }
  return [];
};

// Generate classes 1-12
const generateClasses = (boardId: string): Class[] => {
  return Array.from({ length: 12 }, (_, i) => {
    const classNumber = i + 1;
    let gradeRange: 'primary' | 'secondary' | 'senior' = 'primary';
    if (classNumber >= 9 && classNumber <= 10) gradeRange = 'secondary';
    if (classNumber >= 11) gradeRange = 'senior';
    
    return {
      id: `class-${classNumber}-${boardId}`,
      number: classNumber,
      boardId,
      subjects: getSubjectsForClass(classNumber),
      description: `Comprehensive ${classNumber}${getOrdinalSuffix(classNumber)} grade curriculum with expert faculty`,
      totalStudents: Math.floor(Math.random() * 500) + 100,
      passPercentage: Math.floor(Math.random() * 20) + 75,
      gradeRange,
    };
  });
};

const getOrdinalSuffix = (n: number): string => {
  if (n === 1) return 'st';
  if (n === 2) return 'nd';
  if (n === 3) return 'rd';
  return 'th';
};

const allClasses = [...boards.flatMap(b => generateClasses(b.id))];

// Generate courses with specific subjects
const generateCourses = (classId: string, boardId: string): Course[] => {
  const classData = allClasses.find(c => c.id === classId);
  if (!classData) return [];
  
  const subjects = classData.subjects;
  const classNumber = classData.number;
  
  // Define grade range descriptions
  let gradeDescription = '';
  if (classNumber >= 1 && classNumber <= 8) {
    gradeDescription = 'Foundation';
  } else if (classNumber >= 9 && classNumber <= 10) {
    gradeDescription = 'Secondary';
  } else {
    gradeDescription = 'Senior Secondary';
  }
  
  return subjects.map((subject) => ({
    id: `course-${classId}-${subject}-${boardId}`,
    classId,
    boardId,
    name: `${subject}`,
    description: `Master ${subject} with our comprehensive ${gradeDescription} curriculum aligned with ${boardId.toUpperCase()} Board standards. ${classNumber >= 11 ? 'Prepare for competitive exams with in-depth concepts.' : 'Build strong fundamentals for academic success.'}`,
   
    modules: classNumber >= 11 ? Math.floor(Math.random() * 10) + 8 : Math.floor(Math.random() * 6) + 4,
  
    rating: (Math.random() * 1.5 + 3.5),
    studentsEnrolled: Math.floor(Math.random() * 300) + 50,
    startDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    highlights: classNumber >= 11 ? [
      'Advanced problem solving',
      'Competitive exam preparation',
      'One-on-one mentorship',
      'Weekly mock tests',
      'Doubt clearing sessions',
    ] : [
      'Interactive live sessions',
      'Personalized mentorship',
      'Regular assessments',
      'Doubt clearing sessions',
      'Fun learning activities',
    ],
    subject,
    icon: subjectIcons[subject] || <BookOpen className="w-4 h-4" />,
  }));
};

// Main Component
export default function CourseCatalog() {
  const [selectedBoard, setSelectedBoard] = useState<string>('cbse');
  const [selectedClass, setSelectedClass] = useState<string>('class-1-cbse');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  const selectedClassData = allClasses.find(c => c.id === selectedClass);
  
  // Filter classes by board
  const filteredClasses = allClasses.filter(c => c.boardId === selectedBoard);
  
  // Get courses for selected class
  const courses = generateCourses(selectedClass, selectedBoard);
  
  // Filter courses by search and subject
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || course.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  // Get unique subjects for filter
  const uniqueSubjects = Array.from(new Set(courses.map(c => c.subject)));

  
  const totalCourses = filteredClasses.reduce((acc, cls) => acc + getSubjectsForClass(cls.number).length, 0);

  // Group classes by range for better display
  const primaryClasses = filteredClasses.filter(c => c.gradeRange === 'primary');
  const secondaryClasses = filteredClasses.filter(c => c.gradeRange === 'secondary');
  const seniorClasses = filteredClasses.filter(c => c.gradeRange === 'senior');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header Section */}
      <header className="relative bg-gradient-to-r from-[#28355E] via-[#28355E] to-[#28355E] dark:from-blue-800 dark:via-indigo-800 dark:to-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
                Course Catalog
              </h1>
              <p className="text-lg md:text-xl text-blue-100 opacity-90 max-w-2xl">
                Discover the perfect learning path for your academic journey with CBSE & UP Board
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/20">
              <School className="w-5 h-5" />
              <span className="font-semibold">
                {filteredClasses.length} Classes • {totalCourses} Courses
              </span>
            </div>
          </div>

          
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Board Selector */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {boards.map((board) => (
            <button
              key={board.id}
              onClick={() => {
                setSelectedBoard(board.id);
                const firstClass = generateClasses(board.id)[0];
                setSelectedClass(firstClass?.id || '');
                setSelectedSubject('all');
              }}
              className={`flex-1 flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${
                selectedBoard === board.id
                  ? `bg-gradient-to-r ${board.color} text-white shadow-lg shadow-${board.id === 'cbse' ? 'blue' : 'orange'}-500/30 scale-[1.02]`
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:shadow-lg border-2 border-transparent hover:border-blue-200 dark:hover:border-slate-600'
              }`}
            >
              <div className={`p-2 rounded-xl ${selectedBoard === board.id ? 'bg-white/20' : 'bg-blue-50 dark:bg-slate-700'}`}>
                {board.icon}
              </div>
              <div className="text-left">
                <p className={`font-semibold ${selectedBoard === board.id ? 'text-white' : 'text-slate-800 dark:text-white'}`}>
                  {board.name}
                </p>
                <p className={`text-xs ${selectedBoard === board.id ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>
                  {board.description}
                </p>
              </div>
              {selectedBoard === board.id && (
                <CheckCircle className="w-5 h-5 ml-auto text-white" />
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Class Navigation */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <Grid3x3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Classes
                </h2>
                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                  {filteredClasses.length}
                </span>
              </div>
              
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-blue-200 dark:scrollbar-thumb-slate-600">
                {/* Primary Section (1-8) */}
                {primaryClasses.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      <span className="flex-1 border-t border-slate-200 dark:border-slate-700"></span>
                      <span>Foundation (1-8)</span>
                      <span className="flex-1 border-t border-slate-200 dark:border-slate-700"></span>
                    </div>
                    {primaryClasses.map((cls) => (
                      <ClassButton
                        key={cls.id}
                        cls={cls}
                        selectedClass={selectedClass}
                        onSelect={setSelectedClass}
                      />
                    ))}
                  </div>
                )}

                {/* Secondary Section (9-10) */}
                {secondaryClasses.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      <span className="flex-1 border-t border-slate-200 dark:border-slate-700"></span>
                      <span>Secondary (9-10)</span>
                      <span className="flex-1 border-t border-slate-200 dark:border-slate-700"></span>
                    </div>
                    {secondaryClasses.map((cls) => (
                      <ClassButton
                        key={cls.id}
                        cls={cls}
                        selectedClass={selectedClass}
                        onSelect={setSelectedClass}
                      />
                    ))}
                  </div>
                )}

                {/* Senior Section (11-12) */}
                {seniorClasses.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      <span className="flex-1 border-t border-slate-200 dark:border-slate-700"></span>
                      <span>Senior Secondary (11-12)</span>
                      <span className="flex-1 border-t border-slate-200 dark:border-slate-700"></span>
                    </div>
                    {seniorClasses.map((cls) => (
                      <ClassButton
                        key={cls.id}
                        cls={cls}
                        selectedClass={selectedClass}
                        onSelect={setSelectedClass}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Class Stats */}
              {selectedClassData && (
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  
                  <div className="mt-2 flex flex-wrap gap-1">
                    {selectedClassData.subjects.map((subject) => (
                      <span key={subject} className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full flex items-center gap-1">
                        {subjectIcons[subject]}
                        {subject}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 text-center">
                    {selectedClassData.gradeRange === 'primary' && '🎯 Building strong fundamentals'}
                    {selectedClassData.gradeRange === 'secondary' && '📚 Preparing for board exams'}
                    {selectedClassData.gradeRange === 'senior' && '🎓 Advanced concepts & competitive prep'}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Main Content - Courses */}
          <section className="flex-1">
            {/* Search and View Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                />
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
              
              <div className="flex items-center gap-2 flex-wrap">
                {/* Subject Filter */}
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                >
                  <option value="all">All Subjects</option>
                  {uniqueSubjects.map((subject) => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Results count */}
            <div className="mb-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Showing <span className="font-semibold text-slate-700 dark:text-slate-300">{filteredCourses.length}</span> courses
                {selectedClassData && (
                  <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                    Class {selectedClassData.number} {getOrdinalSuffix(selectedClassData.number)}
                  </span>
                )}
              </p>
            </div>

            {/* Course Grid/List */}
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
              : 'space-y-4'
            }>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className={`bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group ${
                      viewMode === 'grid' ? 'p-6' : 'p-5 flex flex-col sm:flex-row sm:items-center gap-4'
                    }`}
                  >
                    {viewMode === 'grid' ? (
                      // Grid View
                      <>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                              {course.icon}
                            </span>
                            <div>
                              <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full mb-1">
                                Grade {selectedClassData?.number || ''}
                              </span>
                              <h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {course.name}
                              </h3>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star className="w-4 h-4 fill-amber-400" />
                            <span className="text-sm font-semibold">{course.rating.toFixed(1)}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                          {course.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {course.highlights.slice(0, 3).map((highlight) => (
                            <span key={highlight} className="text-xs bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">
                              {highlight}
                            </span>
                          ))}
                        </div>
                        
                        
                      </>
                    ) : (
                      // List View
                      <>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="p-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                              {course.icon}
                            </span>
                            <span className="px-3 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full">
                              Class {selectedClassData?.number || ''}
                            </span>
                            <h3 className="text-base font-bold text-slate-800 dark:text-white">
                              {course.name}
                            </h3>
                            <div className="flex items-center gap-1 text-amber-500">
                              <Star className="w-3 h-3 fill-amber-400" />
                              <span className="text-xs font-semibold">{course.rating.toFixed(1)}</span>
                            </div>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-1">
                            {course.description}
                          </p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
                            
                          </div>
                        </div>
                        
                      </>
                    )}
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <BookOpen className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                  <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">No courses found</h3>
                  <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

// Class Button Component
function ClassButton({ 
  cls, 
  selectedClass, 
  onSelect 
}: { 
  cls: Class; 
  selectedClass: string; 
  onSelect: (id: string) => void;
}) {
  return (
    <button
      onClick={() => onSelect(cls.id)}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
        selectedClass === cls.id
          ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 border-l-4 border-blue-600 dark:border-blue-400'
          : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
          selectedClass === cls.id
            ? 'bg-blue-600 text-white'
            : 'bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-white'
        }`}>
          {cls.number}
        </span>
        <span className="font-medium">Class {cls.number}</span>
      </div>
      <ChevronRight className={`w-4 h-4 transition-transform ${
        selectedClass === cls.id ? 'text-blue-600 rotate-90' : 'text-slate-400'
      }`} />
    </button>
  );
}