import React, {useState} from "react";
import { Helmet } from "react-helmet";



const RecruiterDashboard = ({	handleRejectApplicant,
								handleDeleteJob,
								applicants,
								editJobLocation,
								editJobSalary,
								editJobTitle,
								editJobCompany,
								editJobDescription,
								editPostedBy,
								editStatus,
								editIsExternal,
								editSkills,
								setEditJobLocation,
								setEditJobSalary,
								setEditJobTitle,
								setEditJobCompany,
								setEditJobDescription,
								setEditPostedBy,
								setEditStatus,
								setEditIsExternal,
								setSelectedJob,
								setEditSkills,
								handleAddJobListing,
								handleInputChange,
								jobTitle,
								jobCompany,
								jobLocation,
								jobSalary,
								jobDescription,
								postedBy,
								status,
								selectedJob,
								handleEditButtonClick,
								handleUpdateJob,
								isExternal,
								skills,
								setJobTitle,
								setJobCompany,
								setJobLocation,
								setJobSalary,
								setJobDescription,
								recruiterJobs,
								setPostedBy,
								setSkills,
								setStatus,
								setIsExternal,
							}) => {


	const [selectedJobApplicants, setSelectedJobApplicants] = useState([]);
	const [showApplicants, setShowApplicants] = useState(null);



	const fetchApplicants = async (jobId) => {
		try {
			const response = await fetch(`/api/user/jobPosts/getApplicantsByJob/${jobId}`);
			const data = await response.json();

			// Fetch user details for each applicant
			const applicantsWithDetails = await Promise.all(
				data.map(async (applicant) => {
					const userResponse = await fetch(`/api/account/getUser/${applicant.userId}`);
					const userData = await userResponse.json();
					return { ...applicant, name: userData.name, email: userData.email, jobId: jobId };
				})
			);

			setSelectedJobApplicants(applicantsWithDetails);
			setShowApplicants(jobId);
		} catch (error) {
			console.error('Failed to fetch applicants:', error);
		}
	};

	const renderSelectedJobApplicants = () => {
		if (selectedJobApplicants.length === 0) {
			return <p>No Applications Found!</p>;
		}
		else
		return selectedJobApplicants.map((applicant) => (
			<div key={applicant._id} className="flex flex-row justify-between p-4 mb-4 border border-gray-300 rounded">
				<div>
					<p>Name: {applicant.name}</p>
					<p>Email: {applicant.email}</p>
					<a className="text-indigo-600 underline" href={applicant.resume} download>Download Resume</a>
					<br />
					<a className="text-indigo-600 underline" href={applicant.coverLetter} download>Download Cover Letter</a>
				</div>
				<div className="reject-button-container flex items-center">
					<button  onClick={(event) => handleRejectApplicant(event,applicant.jobId,applicant.userId)} className="text-red-600 underline">Reject</button>
				</div>
			</div>
		));
	};


	const [showAddJobForm, setShowAddJobForm] = useState(false);

	return (
		<div className="w-full">
			<Helmet>
				<meta charSet='utf-8'/>
				<title>Recruiter Dashboard</title>
			</Helmet>

			<div className="w-100">
				<div className="w-full lg:w-full bg-white relative lg:rounded-t-xl">
					<div className="flex flex-col justify-between gap-3 p-4">
						<h2 className="text-2xl font-bold md:text-3xl m-12 text-center">Recruiter Dashboard</h2>
						{showAddJobForm && (
							<>
								<form onSubmit={handleAddJobListing} className="space-y-4">
									<div className="flex flex-row justify-between">
									<h3 className="text-xl font-semibold mb-3">Add a New Job Listing</h3>
									<button
										className="w-10 p-2 bg-red-500 text-white font-semibold rounded"
										onClick={() => setShowAddJobForm(!showAddJobForm)}
									>
										x
									</button>
									</div>
									<input
										type="text"
										placeholder="Job Title"
										value={jobTitle}
										onChange={(e) => handleInputChange(e, setJobTitle)}
										required
										className="w-full p-2 border border-gray-300 rounded"
									/>
									<input
										type="text"
										placeholder="Company"
										value={jobCompany}
										onChange={(e) => handleInputChange(e, setJobCompany)}
										required
										className="w-full p-2 border border-gray-300 rounded"
									/>
									<input
										type="text"
										placeholder="Location"
										value={jobLocation}
										onChange={(e) => handleInputChange(e, setJobLocation)}
										required
										className="w-full p-2 border border-gray-300 rounded"
									/>
									<input
										type="text"
										placeholder="Salary"
										value={jobSalary}
										onChange={(e) => handleInputChange(e, setJobSalary)}
										required
										className="w-full p-2 border border-gray-300 rounded"
									/>

									<input
										type="text"
										placeholder="skills"
										value={skills}
										onChange={(e) => handleInputChange(e, setSkills)}
										required
										className="w-full p-2 border border-gray-300 rounded"
									/>

									<input
										type="hidden"
										value={isExternal}
										className="w-full p-2 border border-gray-300 rounded"
									/>

									<textarea
										placeholder="Job Description"
										value={jobDescription}
										onChange={(e) => handleInputChange(e, setJobDescription)}
										required
										className="w-full p-2 border border-gray-300 rounded"
										rows="4"
									></textarea>
									<div className="flex justify-center items-center">
									<button
										type="submit"
										className="w-72 p-2 bg-indigo-600 text-white font-semibold rounded"
									>
										Add Job Post
									</button>
									</div>
								</form>
							</>
						)}
						<>
						{!showAddJobForm ? (
						<button
							className="w-72 p-2 bg-red-500 text-white font-semibold m-auto rounded"
							onClick={() => setShowAddJobForm(!showAddJobForm)}
						>
							+ Create New Job Posting
						</button> ) : (null)}
							</>

						 <h3 className="text-xl font-semibold mt-8 mb-3">Your Job Listings</h3>
						<div>
							{recruiterJobs.length > 0 ? (
								recruiterJobs.slice(0).reverse().map((job) => (
									<div
										key={job._id}
										className="p-4 mb-4 border border-gray-300 rounded"
									>
										{selectedJob && selectedJob._id === job._id ? (
											<div>
												<h3 className="text-xl font-semibold mt-8 mb-3">
													Edit Job Listing
												</h3>
												<form onSubmit={(e) => e.preventDefault()} className="space-y-4">
													<input
														type="text"
														placeholder="Job Title"
														value={editJobTitle}
														onChange={(e) => handleInputChange(e, setEditJobTitle)}
														required
														className="w-full p-2 border border-gray-300 rounded"
													/>
													<input
														type="text"
														placeholder="Company"
														value={editJobCompany}
														onChange={(e) => handleInputChange(e, setEditJobCompany)}
														required
														className="w-full p-2 border border-gray-300 rounded"
													/>
													<input
														type="text"
														placeholder="Location"
														value={editJobLocation}
														onChange={(e) => handleInputChange(e, setEditJobLocation)}
														required
														className="w-full p-2 border border-gray-300 rounded"
													/>
													<input
														type="text"
														placeholder="Salary"
														value={editJobSalary}
														onChange={(e) => handleInputChange(e, setEditJobSalary)}
														required
														className="w-full p-2 border border-gray-300 rounded"
													/>
													<input
														type="text"
														placeholder="skills"
														value={editSkills}
														onChange={(e) => handleInputChange(e, setEditSkills)}
														required
														className="w-full p-2 border border-gray-300 rounded"
													/>
													<input
														type="hidden"
														value={editIsExternal}
														className="w-full p-2 border border-gray-300 rounded"
													/>
													<textarea
														placeholder="Job Description"
														value={editJobDescription}
														onChange={(e) => handleInputChange(e, setEditJobDescription)}
														required
														className="w-full p-2 border border-gray-300 rounded"
														rows="4"
													></textarea>
													<button
														type="submit"
														className="w-full p-2 bg-indigo-600 text-white font-semibold rounded"
														onClick={() =>
															handleUpdateJob(
																editJobTitle,
																editJobCompany,
																editJobLocation,
																editJobSalary,
																editJobDescription,
																editSkills,
																editIsExternal,
																selectedJob.postedBy,
																selectedJob.postedOn,
																selectedJob.status
															)
														}
													>
														Update Job Post
													</button>
													<button type="button"
														className="w-full p-2 mt-2 bg-red-600 text-white font-semibold rounded"
														onClick={() => setSelectedJob(null)}
														>
														Cancel
													</button>
												</form>
											</div>
										) : (
											<>
												<h4 className="text-lg font-semibold">{job.title}</h4>
												<p className="text-green-500">{job.company}</p>
												<p>{job.location}</p>
												<p>{job.salary}</p>
												<p>{job.description}</p>


												<button
													className="bg-indigo-600 text-white font-semibold rounded p-2 mt-2"
													onClick={() => handleEditButtonClick(job)}
												>
													Edit
												</button>

												<button
													className="bg-indigo-600 text-white font-semibold rounded p-2 m-2"
													onClick={() => fetchApplicants(job._id)}
												>
													Show Applicants
												</button>
												<button
													className="bg-red-600 text-white font-semibold rounded p-2 mt-2"
													onClick={() => handleDeleteJob(job._id)}
												>
													Delete
												</button>
												{showApplicants === job._id && (
													<div>
														<h2 className={"font-semibold"}>Applicants</h2>
														{renderSelectedJobApplicants()}
													</div>
												)}
											</>
										)}
									</div>
								))
							) : (
								<div className="text-center">
									<p>Create your first job posting!</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecruiterDashboard;