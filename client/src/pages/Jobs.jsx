import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import profile_pic from "../static/images/profile.jpg";
import default_job_pic from '../static/images/default_job.png';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import MyConnections from "../components/profile/MyConnections";
import RecruiterDashboard from "../components/jobs/RecruiterDashboard";
import PositionName from "../components/shared/PositionName";
import CardSkeleton from '../components/shared/CardSkeleton';
import VerifiedUser from '../components/profile/VerifiedUser';


const Jobs = () => {
    const navigate = useNavigate();

    // Loading
    const [isLoading, setIsLoading] = useState(true);

    const email = localStorage.getItem('email') || '';

    const [applicants, setApplicants] = useState([]);

    // States related to user and job data
    const [user, setUser] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [jobListings, setJobListings] = useState([]);

    // States related to job search
    const [searchTerm, setSearchTerm] = useState('');

    // States related to job application
    const [cvFile, setCvFile] = useState(null);
    const [coverLetter, setCoverLetter] = useState('');
    const [activeJobApplicationId, setActiveJobApplicationId] = useState(null);

    // States related to job detail and job application modals
    const [activeModalId, setActiveModalId] = useState(null);

    // States related to adding a job listing
    const [jobTitle, setJobTitle] = useState('');
    const [jobCompany, setJobCompany] = useState('');
    const [jobLocation, setJobLocation] = useState('');
    const [jobSalary, setJobSalary] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [postedBy, setPostedBy] = useState('');
    const [isExternal, setIsExternal] = useState(false);
    const [status, setStatus] = useState('Posted');
    const [skills, setSkills] = useState('');

    const [recruiterId, setRecruiterId] = useState('');

    const [selectedJob, setSelectedJob] = useState(null);

    const [showAppliedJobs, setShowAppliedJobs] = useState(false);


    const [editApplicationModal, setEditApplicationModal] = useState(false);



    // Redirect to login if not logged in
    useEffect(() => {
        if (!localStorage.getItem('loggedIn')) {
            navigate('/login');
        }
    }, []);

    // Fetch user data
    useEffect(() => {
        if (email) {
            axios
                .get('../api/account/userbymail', { params: { email } })
                .then(res => {
                    setUser(res.data)

                    if (res.data.isRecruiter) { // Check if the user is a recruiter
                        setRecruiterId(res.data._id);
                    }

                })

                .catch(err => console.log(err));

        }
    }, [email]);

    // Fetch job data
    useEffect(() => {
        axios.get("../api/user/jobPosts/getJobPosts")
            .then(res => {
                setJobs(res.data)
                setIsLoading(false);
            }).catch(err => {
            console.log(err)
        })
    }, []);

    // Toggle body overflow when modal is open
    useEffect(() => {
        document.body.classList.toggle('overflow-hidden', !!activeModalId);
    }, [activeModalId]);

    const [editJobTitle, setEditJobTitle] = useState("");
    const [editJobCompany, setEditJobCompany] = useState("");
    const [editJobLocation, setEditJobLocation] = useState("");
    const [editJobSalary, setEditJobSalary] = useState("");
    const [editJobDescription, setEditJobDescription] = useState("");
    const [editSkills, setEditSkills] = useState("");
    const [editIsExternal, setEditIsExternal] = useState(false);
    const [editStatus, setEditStatus] = useState("");


    const handleEditButtonClick = (job) => {
        if (job) {
            setEditJobTitle(job.title);
            setEditJobCompany(job.company);
            setEditJobLocation(job.location);
            setEditJobSalary(job.salary);
            setEditJobDescription(job.description);
            setEditSkills(job.skills.join(', '));
            setEditIsExternal(job.isExternal);
        }
        setSelectedJob(job);
    };


    const handleEditApplication = async (jobId, userId) => {


        const base64CvFile = await toBase64(cvFile);
        const base64CoverFile = await toBase64(coverLetter);

        // Call API to update user's resume and cover letter for the jobId
        const response = await fetch(`/api/user/jobPosts/updateApplication/${jobId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // Add authorization header if required
            },
            body: JSON.stringify({ userId, resume: base64CvFile, coverLetter: base64CoverFile }),
        });

        if (response.ok) {
            window.location.reload();
        } else {
            // Handle error
        }
    };


    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handleApplyJob = async (jobId) => {
        console.log(jobId)
        if (!cvFile || !coverLetter) {
            alert("Please upload your CV and enter a cover letter before applying");
        } else {
            try {
                const base64CvFile = await toBase64(cvFile);
                const base64CoverFile = await toBase64(coverLetter);


                await axios.post("../api/user/jobPosts/applyForJob", {
                    userId: user._id,
                    jobId: jobId,
                    resume: base64CvFile,
                    coverLetter: base64CoverFile,
                });

                // Close the modal and clear the data after submitting
                window.location.reload();
            } catch (error) {
                console.error("Error applying for job:", error);
            }
        }
    };

    const handleOpenJobApplicationModal = (event, jobId) => {
        event.stopPropagation();
        setActiveJobApplicationId(jobId);
        setActiveModalId(null);
    };

    const handleCloseJobApplicationModal = () => {
        setActiveJobApplicationId(null);
        setCvFile(null);
        setCoverLetter('');
    };

    // Job detail modal functions
    const handleOpenModal = (job) => {
        setActiveModalId(job._id);
    };

    const handleCloseModal = () => {
        setActiveModalId(null);
    };
    // Add job listing functions
    const handleInputChange = (e, setState) => {
        setState(e.target.value);
    };

    const recruiterJobs = jobs.filter(job => job.postedBy.includes(recruiterId));


    const handleUpdateJob = async (
        title,
        company,
        location,
        salary,
        description,
        skills,
        isExternal,
        postedBy,
        postedOn,
        status
    ) => {
        const updatedJob = {
            title,
            company,
            location,
            salary,
            description,
            skills: skills.split(",").map((skill) => skill.trim()),
            isExternal,
            postedBy,
            postedOn,
            status,
        };

        try {
            const response = await axios.put(
                `/api/user/jobPosts/updateJobPost/${selectedJob._id}`, // Use the job ID in the URL
                updatedJob, // Send the updatedJob object without the 'id' field
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (response.status === 200) {
                // Handle successful update
                setSelectedJob(null);
                setJobs((prevJobPosts) =>
                    prevJobPosts.map((jobPost) =>
                        jobPost._id === response.data._id ? response.data : jobPost
                    )
                );
                // Refresh the job listings by calling the function that fetches the data
                // (e.g., fetchRecruiterJobs())
            } else {
                // Handle error
                console.error("Error updating the job post.");
            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleAddJobListing = async (e) => {
        e.preventDefault();
        try {
            const newJob = {
                title: jobTitle,
                company: jobCompany,
                location: jobLocation,
                salary: jobSalary,
                description: jobDescription,
                skills: skills,
                postedBy: recruiterId,
                status: status,
                isExternal: isExternal
            };
            const response = await axios.post('../api/user/jobPosts/createJobPost', newJob);
            setJobListings([...jobListings, response.data]);
            setJobTitle('');
            setJobCompany('');
            setJobLocation('');
            setJobSalary('');
            setJobDescription('')
            setPostedBy('')
            setSkills('');
            setStatus('');
            window.location.reload();

        } catch (error) {
            console.error('Error adding job listing:', error);
        }
    };


    const handleDeleteJob = async (jobId) => {
        const isConfirmed = window.confirm(`Are you sure you want to delete this job posting?`);

        if (isConfirmed) {
            try {
                const response = await fetch(`/api/user/jobPosts/deleteJobPost?id=${jobId}`, {
                    method: "DELETE",
                });

                if (response.ok) {

                    window.location.reload();
                } else {
                    console.error("Failed to delete job:", response.statusText);
                }
            } catch (error) {
                console.error("Failed to delete job:", error);
            }
        }
    };



    const handleRejectApplicant = async (event, jobId, applicantUserId) => {
        event.stopPropagation();
        let isConfirmed;
        if (user.isRecruiter) {
            isConfirmed = window.confirm(`Are you sure you want to reject this applicant?`);
        } else {
            isConfirmed = window.confirm(`Are you sure you want to withdraw your application?`);
        }

        if (isConfirmed) {
            try {
                const response = await fetch(`/api/user/jobPosts/rejectApplicant/${jobId}`, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({jobId, applicantUserId}),
                });

                if (response.ok) {
                    window.location.reload();
                } else {
                    console.error("Failed to reject applicant:", response.statusText);
                }
            } catch (error) {
                console.error("Error has occurred: Failed to reject applicant:", error);
            }
        }
    };



    const [showEditApplicationModal, setShowEditApplicationModal] = useState(false);

    const handleOpenEditApplicationModal = (event) => {
        event.stopPropagation();
        setShowEditApplicationModal(true);
        setActiveModalId(null);
    };

    const handleCloseEditApplicationModal = () => {
        setShowEditApplicationModal(false);
    };


    return (

        <div className="w-100">
            <Helmet>
                <meta charSet='utf-8'/>
                <title>Job Application</title>
            </Helmet>

            <div className="flex flex-col items-center mt-5">
                <div className="flex-auto w-full md:w-3/4 lg:w-10/12 lg:p-5">
                    <div className="flex lg:gap-8">

                        <div class="flex flex-items items-center hidden lg:block">
                            <div className="w-[15rem]">
                                <div className="card bg-base-100 shadow-xl p-5">
                                <figure className="px-10 pt-10">
                                    <img src={profile_pic} alt="Shoes" className="rounded-xl" />
                                </figure>
                                <div className="card-body items-center text-center p-3">
                                    <h1 className="card-title">
                                        <div className="flex items-center">
                                            <div className="w-auto">
                                                {user.name}
                                            </div>
                                            <VerifiedUser name={user.name} />
                                        </div>
                                    </h1>
                                    <div className="side-user-info">
                                        <PositionName id={localStorage.getItem("uid")}/>
                                    </div>
                                    <hr />
                                    <div className="side-user-info items-left">
                                        <p>
                                            <span className="font-semibold">
                                            {/* Skills: <br /> */}
                                            </span>
                                            {/* {user_skills && Object.keys(user_skills).map((skills_txt) => (
                                            <span>{user_skills[skills_txt]}</span>
                                        ))} */}
                                        </p>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full w-full lg:w-3/4 bg-white relative lg:rounded-t-xl mb-[5rem]">
                            
                            {/* if user is a recruiter*/}
                            {user.isRecruiter === true ? (
                                <RecruiterDashboard
                                    handleRejectApplicant={handleRejectApplicant}
                                    handleDeleteJob={handleDeleteJob}
                                    applicants={applicants}
                                    setSelectedJob={setSelectedJob}
                                    setEditJobTitle={setEditJobTitle}
                                    setEditJobCompany={setEditJobCompany}
                                    setEditJobLocation={setEditJobLocation}
                                    setEditJobSalary={setEditJobSalary}
                                    setEditJobDescription={setEditJobDescription}
                                    setEditSkills={setEditSkills}
                                    setEditStatus={setEditStatus}
                                    setEditIsExternal={setEditIsExternal}
                                    editJobTitle={editJobTitle}
                                    editJobCompany={editJobCompany}
                                    editJobLocation={editJobLocation}
                                    editJobSalary={editJobSalary}
                                    editJobDescription={editJobDescription}
                                    editSkills={editSkills}
                                    editStatus={editStatus}
                                    editIsExternal={editIsExternal}
                                    handleEditButtonClick={handleEditButtonClick}
                                    selectedJob={selectedJob}
                                    handleUpdateJob={handleUpdateJob}
                                    handleAddJobListing={handleAddJobListing}
                                    handleInputChange={handleInputChange}
                                    jobTitle={jobTitle}
                                    jobCompany={jobCompany}
                                    jobLocation={jobLocation}
                                    jobSalary={jobSalary}
                                    jobDescription={jobDescription}
                                    postedBy={postedBy}
                                    skills={skills}
                                    status={status}
                                    isExternal={isExternal}
                                    setJobTitle={setJobTitle}
                                    setJobCompany={setJobCompany}
                                    setJobLocation={setJobLocation}
                                    setJobSalary={setJobSalary}
                                    setJobDescription={setJobDescription}
                                    recruiterJobs={recruiterJobs}
                                    setJobListings={setJobListings}
                                    setPostedBy={setPostedBy}
                                    setSkills={setSkills}
                                    setStatus={setStatus}
                                    setIsExternal={setIsExternal}
                                />


                            ) :
                            //IF USER IS NOT RECRUITER:
                            <div className="w-full w-full bg-white relative lg:rounded-t-xl">

                                <div className="flex flex-col justify-between gap-3">

                                    <h2 className="flex justify-center text-2xl font-bold md:text-3xl m-12">{showAppliedJobs ? 'Applied Jobs' : 'Recent Available Jobs'}</h2>
                                    <div className="mb-4 flex gap-x-5 md:gap-x-10 justify-center">
                                        <form>
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="relative w-full">
                                                    <input type="text"
                                                        placeholder="Search jobs..."
                                                        className="rounded-lg w-full py-2 px-4 leading-tight focus:outline-none focus:shadow-outline"
                                                        value={searchTerm}
                                                        onChange={(event) => setSearchTerm(event.target.value)}
                                                        required/>
                                                    <button type="submit"
                                                            className="absolute top-0 right-0 p-2 text-sm font-medium text-white bg-indigo-400 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                        <svg aria-hidden="true" className="w-5 h-5" fill="none"
                                                            stroke="currentColor" viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                                        </svg>
                                                        <span className="sr-only">Search</span>
                                                    </button>
                                                </div>
                                                <button  type="button" onClick={() => setShowAppliedJobs(!showAppliedJobs)} className="mt-3 w-2/3 cursor-pointer p-2 text-white font-semibold duration-150 transform border border-white rounded-lg hover:bg-blue-800 bg-indigo-400 group-hover:border-transparent">
                                                    {showAppliedJobs ? 'Available Jobs' : 'Applied Jobs'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                {isLoading && <CardSkeleton cards={4}/>} 

                                <div>
                                    {jobs
                                        .slice(0)
                                        .reverse()
                                        .reduce((acc, job) => {
                                            // Filter by search term
                                            const searchTermFilter = `${job.title} ${job.company} ${job.location}`
                                                .toLowerCase()
                                                .includes(searchTerm.toLowerCase());

                                            // Check if the user has applied for the job
                                            const userApplied = job.applicants.some(
                                                (applicant) => applicant.userId === user._id
                                            );

                                            // Filter by applied jobs or not applied jobs based on showAppliedJobs state
                                            const shouldDisplayJob = showAppliedJobs ? searchTermFilter && userApplied : searchTermFilter && !userApplied;

                                            if (shouldDisplayJob) {
                                                acc.push({ job, userApplied });
                                            }

                                            return acc;
                                        }, [])
                                        .map(({ job, userApplied }) => (
                                        <div key={job._id} className=" items-center grid gap-5 my-2 md:grid-cols-2 lg:grid-cols-1 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 text-black max-w-screen-xl">
                                            <div onClick={() => handleOpenModal(job)} className="flex flex-col justify-between gap-3 px-6 py-6 border border-gray-200 lg:flex-row group hover:border-black rounded-xl">
                                                <div className="flex flex-col items-start flex-1 gap-5 lg:flex-row">
                                                    <div className="w-20">
                                                        <img className={"rounded-lg"} src={default_job_pic} alt="Logo"/>
                                                    </div>

                                                    <div className="flex-1 items-initial lg:text-start">
                                                        <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
                                                        <div>
                                                            <span className="text-green-500">{job.company}</span>
                                                            <span className='pl-2 pr-2'>•</span>
                                                            <span className='jobs-salary'>{job.salary}</span>

                                                            <span className='jobs-location'>{job.location}</span>
                                                            <div className='jobs-description pt-5'>
                                                                {job.description.substring(0, 50)} ...
                                                            </div>
                                                        </div>
                                                        <>
                                                        {!userApplied ? (
                                                        <div className='pt-5 text-right'>
                                                            <a onClick={(event) => handleOpenJobApplicationModal(event,job._id)} className="cursor-pointer px-6 py-2 text-white font-semibold duration-150 transform border border-white rounded-full hover:bg-blue-800 bg-indigo-400 group-hover:border-transparent">
                                                                Apply
                                                            </a>
                                                        </div>):(

                                                            <div className='pt-5 text-right'>
                                                                <button  onClick={(event) => handleRejectApplicant(event,job._id,user._id)} className="mr-4 text-red-600 underline">Delete</button>
                                                                <a onClick={(event) => handleOpenEditApplicationModal(event)} className="cursor-pointer px-6 py-2 text-white font-semibold duration-150 transform border border-white rounded-full hover:bg-blue-800 bg-indigo-400 group-hover:border-transparent">
                                                                    Edit Application
                                                                </a>
                                                            </div>
                                                        )}
                                                        </>

                                                    </div>
                                                </div>
                                            </div>


                                            {/* Modal */}
                                            {activeModalId === job._id && (
                                                <>
                                                    {/* Modal container */}
                                                    <div className="fixed inset-0 flex items-center justify-center z-10">
                                                        {/* Backdrop */}
                                                        <div className="fixed inset-0 bg-black opacity-50 pointer-events-auto"></div>

                                                        {/* Modal content */}
                                                        <div className="flex flex-col lg:h-3/4 lg:w-1/2 sm:w- bg-white max-w-lg lg:rounded-lg relative h-full ">
                                                            <div className={"flex flex-col h-full pr-6 pl-6 pt-6 pb-16 justify-between"}>
                                                                <label onClick={handleCloseModal} className="btn btn-sm btn-circle absolute right-2 top-2">
                                                                    ✕
                                                                </label>
                                                                <div>
                                                                    <img
                                                                        src={profile_pic}
                                                                        className="mt-5 flex w-1/3 mr-auto mb-8 ml-auto rounded-full shadow-xl"
                                                                    />
                                                                    <p className="text-lg font-semibold">{job.title}</p>
                                                                    <p className="text-lg text-green-500 font-semibold mb-2">{job.company}</p>
                                                                </div>
                                                                <div className="flex flex-col overflow-auto">
                                                                    <p className="text-left mt-8 text-2xl italic font-semibold text-lg">Description:</p>
                                                                    <p className="text-left mt-3 text-base leading-relaxed text-black-200">
                                                                        {job.description}
                                                                    </p>
                                                                    <p className="text-left mt-8 text-2xl italic font-semibold text-lg">Salary:</p>
                                                                    <p className="text-left mt-3 text-base leading-relaxed text-black-200 mb-2">
                                                                        {job.salary}
                                                                    </p>
                                                                </div>
                                                                <>
                                                                {!userApplied ? (
                                                                <div className="flex items-center justify-center w-full py-5">
                                                                    <a
                                                                        onClick={(event) => handleOpenJobApplicationModal(event,job._id)} className="cursor-pointer m-auto text-center w-40 items-center justify-center pt-4 pb-4 font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                                    >
                                                                        Apply Now
                                                                    </a>
                                                                </div>) : (<div className='flex items-center justify-center w-full py-5'>
                                                                    <a onClick={(event) => handleOpenEditApplicationModal(event)} className="cursor-pointer px-6 py-2 text-white font-semibold duration-150 transform border border-white rounded-full hover:bg-blue-800 bg-indigo-400 group-hover:border-transparent">
                                                                        Edit Application
                                                                    </a>
                                                                </div>)}
                                                                    </>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            {/* Job Application Modal */}
                                            {activeJobApplicationId === job._id && (
                                                <>
                                                    {/* Modal container */}
                                                    <div className="fixed inset-0 flex items-center justify-center z-10">
                                                        {/* Backdrop */}
                                                        <div className="fixed inset-0 bg-black opacity-50 pointer-events-auto"></div>

                                                        {/* Modal content */}
                                                        <div className="bg-white w-full sm:max-w-md lg:max-w-lg p-6 my-8 mx-auto rounded-lg shadow-md z-10">
                                                            <div className="flex justify-between items-center">
                                                                <h2 className="text-2xl font-bold">Update</h2>
                                                                <button onClick={handleCloseJobApplicationModal} className="btn btn-sm btn-circle">
                                                                    ✕
                                                                </button>
                                                            </div>
                                                            <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
                                                                <label htmlFor="cv" className="block text-sm font-medium text-gray-700">
                                                                    CV:
                                                                </label>
                                                                <input
                                                                    type="file"
                                                                    id="cv"
                                                                    name="cv"
                                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                                    onChange={(e) => setCvFile(e.target.files[0])}
                                                                    required
                                                                />
                                                                <label htmlFor="coverLetter" className="block mt-4 text-sm font-medium text-gray-700">
                                                                    Cover Letter:
                                                                </label>
                                                                <input
                                                                    type="file"
                                                                    id="CoverLetter"
                                                                    name="CoverLetter"
                                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                                    onChange={(e) => setCoverLetter(e.target.files[0])}
                                                                    required
                                                                />
                                                                <button
                                                                    type="submit"
                                                                    className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                                    onClick={() => handleApplyJob(job._id)}
                                                                >
                                                                    Submit Application  </button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            {/* Edit Job application Modal */}
                                            {showEditApplicationModal && (
                                                <>
                                                    {/* Modal container */}
                                                    <div className="fixed inset-0 flex items-center justify-center z-10">
                                                        {/* Backdrop */}
                                                        <div className="fixed inset-0 bg-black opacity-50 pointer-events-auto"></div>

                                                        {/* Modal content */}
                                                        <div className="bg-white w-full sm:max-w-md lg:max-w-lg p-6 my-8 mx-auto rounded-lg shadow-md z-10">
                                                            <div className="flex justify-between items-center">
                                                                <h2 className="text-2xl font-bold">Apply for Job</h2>
                                                                <button onClick={handleCloseEditApplicationModal} className="btn btn-sm btn-circle">
                                                                    ✕
                                                                </button>
                                                            </div>
                                                            <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
                                                                <label htmlFor="cv" className="block text-sm font-medium text-gray-700">
                                                                    CV:
                                                                </label>
                                                                <input
                                                                    type="file"
                                                                    id="cv"

                                                                    name="cv"

                                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                                    onChange={(e) => setCvFile(e.target.files[0])}
                                                                    required
                                                                />
                                                                <label htmlFor="coverLetter" className="block mt-4 text-sm font-medium text-gray-700">
                                                                    Cover Letter:
                                                                </label>
                                                                <input
                                                                    type="file"
                                                                    id="CoverLetter"
                                                                    name="CoverLetter"
                                                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                                    onChange={(e) => setCoverLetter(e.target.files[0])}
                                                                    required
                                                                />
                                                                <button
                                                                    type="submit"
                                                                    className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                                    onClick={() => handleEditApplication(job._id,user._id)}
                                                                >
                                                                    Update Application  </button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                        </div>
                                    ))}
                                </div>
                            </div>
                            }
                            {/* <MyConnections /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs