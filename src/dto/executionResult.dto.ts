import { Applicant } from "src/model/applicant.model";
import { CommentDTO } from "./comment.dto";
import { PostDTO } from "./post.dto";
import { UserDTO } from "./user.dto";

export class ExecutionResult {
	status: number;
	data: Array<UserDTO | PostDTO | CommentDTO | Applicant>;
	affectedRow?: number;
}
