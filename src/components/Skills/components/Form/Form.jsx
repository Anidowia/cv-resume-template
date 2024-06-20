import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { fetchSkills } from "../../../../store/slices/skillsSlice";

import Button from "../../../Button/Button";
import Input from "./components/Input";

import { renderSpinner } from "../../../../helpers/helpers";

import styles from "./Form.module.scss";

const Form = ({ isClosed, onCloseForm }) => {
	const dispatch = useDispatch();
	const [serverError, setServerError] = useState(null);
	const [loading, setLoading] = useState(false);

	const initialValues = {
		name: "",
		range: "",
	};

	const validationSchema = Yup.object({
		name: Yup.string().required("Name is required"),
		range: Yup.number()
			.typeError("Range must be a number")
			.required("Range is required")
			.min(10, "Range must be at least 10")
			.max(100, "Range must be at most 100"),
	});

	const onSubmit = async (values, { resetForm }) => {
		setLoading(true);
		try {
			const response = await fetch("/api/skills", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});

			if (!response.ok) {
				throw new Error("Failed to add skill");
			}

			resetForm();
			dispatch(fetchSkills());
			onCloseForm();
		} catch (error) {
			setServerError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={`${styles.form} ${isClosed ? styles.formShifted : ""}`}>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{(formik) => (
					<form
						onSubmit={formik.handleSubmit}
						className="form__info"
						data-testid="form"
					>
						<div className={styles.name}>
							<label htmlFor="name">Skill name:</label>
							<Input
								id="name"
								type="text"
								{...formik.getFieldProps("name")}
								hasError={formik.touched.name && formik.errors.name}
								placeholder="Input skill name"
							/>
						</div>
						<span>{formik.errors.name}</span>

						<div className={styles.range}>
							<label htmlFor="range">Skill range:</label>
							<Input
								id="range"
								type="text"
								{...formik.getFieldProps("range")}
								hasError={formik.touched.range && formik.errors.range}
								placeholder="Input skill range"
							/>
						</div>
						<span>{formik.errors.range}</span>

						<Button text="Add skill" type="submit" />
						{loading && renderSpinner(loading)}

						{serverError && <div className={styles.error}>{serverError}</div>}
					</form>
				)}
			</Formik>
		</div>
	);
};

export default Form;
