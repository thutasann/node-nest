'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useMutation } from '@apollo/client';
import styles from '@/utils/styles';
import { useRouter } from 'next/navigation';
import { RESET_PASSWORD } from '@/graphql/actions/reset-password.action';

const formSchema = z.object({
	password: z.string(),
});

type ResetPasswordSchema = z.infer<typeof formSchema>;

const ResetPassword = ({ activationToken }: { activationToken: string }) => {
	const router = useRouter();
	const [ResetPassword, { loading }] = useMutation(RESET_PASSWORD);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<ResetPasswordSchema>({
		resolver: zodResolver(formSchema),
	});

	const onSubmit = async (data: ResetPasswordSchema) => {
		try {
			await ResetPassword({
				variables: {
					password: data.password,
					activationToken: activationToken,
				},
			});
			toast.success('Passwords Reset');
			reset();
		} catch (error: any) {
			console.log(error);
			toast.error(error.message);
		}
	};

	return (
		<div>
			<h1 className={`${styles.title}`}>Reset password?</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label className={`${styles.label}`}>Enter new password</label>
				<input
					{...register('password')}
					type="password"
					placeholder="enter new password"
					className={`${styles.input}`}
				/>

				<input
					type="submit"
					value="Submit"
					disabled={isSubmitting || loading}
					className={`${styles.button} mt-3`}
				/>
				<br />
				<h5 className="text-center pt-4 font-Poppins text-[14px]">
					Or Go Back to
					<span
						className="text-[#2190ff] pl-1 cursor-pointer"
						onClick={() => router.push('/')}
					>
						Home
					</span>
				</h5>
				<br />
			</form>
		</div>
	);
};

export default ResetPassword;
