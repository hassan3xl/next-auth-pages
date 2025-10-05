// "use client";

// import { apiService } from "@/services/apiService";
// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";

// type ProjectType = {
//   id: string;
//   title: string;
//   description: string;
// };

// type UserDetailsType = {
//   id: string;
//   email: string;
//   projects: ProjectType[];
// };

// const Page = () => {
//   const params = useParams();
//   const { id } = useParams<{ id: string }>();
//   const [userData, setUserData] = useState<UserDetailsType | null>(null);
//   const [loading, setLoading] = useState(false);

//   const fetchUser = async () => {
//     try {
//       setLoading(true);
//       const response = await apiService.get(`api/users/${id}/`);
//       setUserData(response);
//     } catch (error) {
//       console.log("Error fetching user:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (id) fetchUser();
//   }, [id]);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">{userData?.email}</h1>
//       <h2 className="text-xl mt-4">Public Projects</h2>
//       <ul className="mt-2">
//         {userData?.projects?.map((project) => (
//           <li key={project.id} className="border p-3 rounded mb-2">
//             <h3 className="font-semibold">{project.title}</h3>
//             <p>{project.description}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Page;
