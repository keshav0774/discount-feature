import { dsaChallenges, promptChallenges ,systemDesignChallenges, vulnerabilityChallenges} from "../data/problems.js"

export const dsaProblem = async(req, res, next)=>{
    try {
        
        const day = new Date().getDate(); 
        const index = (day - 1) % dsaChallenges.length;
        const problem = dsaChallenges[index];
        
        return res.status(200).json({
            problem : problem,
            message : "here is the today's problem"
        });
    } catch (error) {
        console.log("Error from dsaProblem", error.message)
        return res.status(500).json({
            error : error.message
        })
    }
}

export const promptProblem = async(req,res,next)=>{
    try {
        const day = new Date().getDate(); 
        const index = (day - 1)%promptChallenges.length; 

        const prompt = promptChallenges[index];
        return res.status(200).json({
            prompt : prompt, 
            message : "here is you prompt problem"
        })
    } catch (error) {
        console.log("Error from promptProblem", error.message)
        return res.status(500).json({
            error : error.message
        })
    }
}

export const systemProblem = async(req,res,next)=>{
    try {
        const day = new Date().getDate(); 
        const index = (day -1)%systemDesignChallenges.length; 

        const problem = systemDesignChallenges[index]; 

        return res.status(200).json({
            problem : problem, 
            message : "here is System design problem"
        })
    } catch (error) {
        console.log("Error from systemProblem", error.message)
        return res.status(500).json({
            error : error.message
        })
    }
}

export const vulnerabilityProblem = async(req,res,next)=>{
    try {
        const day = new Date().getDate(); 
        const index = (day -1)%vulnerabilityChallenges.length; 

        const problem = vulnerabilityChallenges[index]; 

        return res.status(200).json({
            problem : problem, 
            message : "here is System design problem"
        })
    } catch (error) {
        console.log("Error from vulnerabilityProblem", error.message)
        return res.status(500).json({
            error : error.message
        })
    }
}


