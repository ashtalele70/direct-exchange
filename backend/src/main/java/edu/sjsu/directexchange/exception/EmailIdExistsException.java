package edu.sjsu.directexchange.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Email Id Already " +
	"Exists")
public class EmailIdExistsException extends RuntimeException {
	/**
	 *
	 * @param message Opponents not found
	 */
	public EmailIdExistsException(final String message) {
		super(message);
	}
}
