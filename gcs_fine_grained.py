"""
Google Cloud Storage - Set Bucket to Fine-Grained Access Control

This script sets a GCS bucket to use fine-grained access control (ACLs)
instead of uniform bucket-level access.

Prerequisites:
1. Install the package: pip install google-cloud-storage
2. Authenticate with: gcloud auth application-default login
   Or set GOOGLE_APPLICATION_CREDENTIALS environment variable
"""

from google.cloud import storage


def set_bucket_fine_grained(bucket_name: str) -> None:
    """
    Sets a bucket to use fine-grained access control.
    
    Fine-grained access means ACLs are enabled and uniform bucket-level
    access is disabled.
    
    Args:
        bucket_name: Name of the GCS bucket to modify
    """
    # Initialize the storage client
    storage_client = storage.Client()
    
    # Get the bucket
    bucket = storage_client.get_bucket(bucket_name)
    
    # Disable uniform bucket-level access to enable fine-grained ACLs
    bucket.iam_configuration.uniform_bucket_level_access_enabled = False
    bucket.patch()
    
    print(f"Bucket '{bucket_name}' has been set to fine-grained access control.")
    print("ACLs are now enabled for this bucket.")


def check_bucket_access_type(bucket_name: str) -> None:
    """
    Check the current access control type of a bucket.
    
    Args:
        bucket_name: Name of the GCS bucket to check
    """
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)
    
    uniform_enabled = bucket.iam_configuration.uniform_bucket_level_access_enabled
    
    if uniform_enabled:
        print(f"Bucket '{bucket_name}' uses uniform bucket-level access.")
    else:
        print(f"Bucket '{bucket_name}' uses fine-grained access control (ACLs enabled).")


if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python gcs_fine_grained.py <bucket_name>")
        print("Example: python gcs_fine_grained.py my-bucket-name")
        sys.exit(1)
    
    bucket_name = sys.argv[1]
    
    print(f"Setting bucket '{bucket_name}' to fine-grained access control...")
    set_bucket_fine_grained(bucket_name)
    
    # Verify the change
    print("\nVerifying access type...")
    check_bucket_access_type(bucket_name)

